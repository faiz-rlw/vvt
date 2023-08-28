<script setup lang="ts">
import type {
  UploadFile,
  UploadFiles,
  UploadProps,
  UploadUserFile,
  UploadRequestOptions,
} from "element-plus";
import { ALLOW_IMAGE_TYPE, FILE_SIZE } from "@/configs/global.config";
import { toast } from "@/utils/util";
import { preview } from "vue3-image-preview";
const emit = defineEmits(["fileObjectList", "customRequest", "changeFileList"]);
const props = defineProps({
  // 图片宽度
  imgWidth: {
    type: String,
    default: "104px",
  },
  // 图片高度
  imgHeight: {
    type: [String, undefined] as PropType<String | undefined>,
  },
  // 图片列表
  fileList: {
    type: Array as PropType<UploadProps["fileList"] | Array<string>>,
    default: [],
  },
  // 上传文件的数量的最大值
  maxCount: {
    type: Number,
    default: 10,
  },
  // 上传文件限制大小量
  allowFileSize: {
    type: Number,
    default: FILE_SIZE,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否使用自定义请求
  useCustomApi: {
    type: Boolean,
    default: true,
  },
  // 是否阻止上传请求
  usePreventUpload: {
    type: Boolean,
    default: false,
  },
  // 图片类型
  allowFileType: {
    type: Array as PropType<Array<FILETYPE>>,
    default: [...ALLOW_IMAGE_TYPE],
  },
});

// 未设置图片高度，则和图片宽度相同
const imgHeight = computed<string>(() => {
  return props.imgHeight ? props.imgHeight.toString() : props.imgWidth;
});

// 渲染图片文件列表
const newFileList: Ref<UploadUserFile[]> = ref([]);
watch(
  () => props.fileList,
  (newVal) => {
    newFileList.value = judgeFileList(newVal);
  },
  { deep: true }
);

// 监听实际上传文件的数量，超过或等于上传限制，不展示上传按钮
watch(
  () => newFileList.value,
  () => {
    if (newFileList.value.length >= props.maxCount || props.disabled) {
      let self = document.querySelector(".el-upload--picture-card");
      nextTick(() => {
        if (self) {
          let parent = self?.parentElement;
          parent && parent.removeChild(self);
        }
      });
    }
  }
);

// 初始化文件列表
onMounted(() => {
  newFileList.value = judgeFileList(props.fileList);
});

/**
 * @description 对文件类型和文件大小的校验
 * @param {string} type 上传文件的类型
 * @param {number} size 上传文件的大小
 */
function validateFile(type: string, size: number): boolean {
  const { allowFileSize, allowFileType } = props;
  if (allowFileSize < size) {
    toast.fail(`请上传小于${allowFileSize / 1024 / 1024}MB的文件`);
    return false;
  } else if (!new Set(allowFileType.map((item) => item.rules)).has(type)) {
    toast.fail("请上传符合格式要求的文件");
    return false;
  } else {
    return true;
  }
}

/**
 * @description 将传入的列表进行格式化处理
 * @param {array} list
 * @returns {array}
 */
function judgeFileList(
  list: UploadProps["fileList"] | Array<string>
): UploadProps["fileList"] {
  if (list && list.length) {
    return list.map((item, index) => {
      if (typeof item === "string") {
        return {
          uid: -index - 1,
          name: `文件${index + 1}`,
          url: item,
          status: "success",
        };
      } else {
        return {
          uid: item.uid || -index - 1,
          name: item.name || `文件${index + 1}`,
          url: item.url,
          status: "success",
        };
      }
    });
  } else {
    return [];
  }
}

// 上传图片默认请求方法
const httpRequest = (options: UploadRequestOptions) => {
  const { file } = options;
  let formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);
  return apiBase.uploadFile(formData);
};

// 上传前校验文件类型和大小
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const { type, size } = rawFile;
  return validateFile(type, size);
};

// 图片预览
const handlePreview = (uploadFile: UploadFile) => {
  let fileIndex = newFileList.value.findIndex(
    (item) => item.url === uploadFile.url
  );
  preview({
    images: newFileList.value,
    index: fileIndex,
  });
};

// 图片移除之后的
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emit("changeFileList", uploadFiles);
};

// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用；
// 目前只用于自定义上传请求时，添加文件
const handleChange = (uploadFile: UploadFile) => {
  if (props.useCustomApi) {
    emit("customRequest", uploadFile);
  }
};
</script>

<template>
  <div
    :style="{
      '--imgWidth': props.imgWidth,
      '--imgHeight': imgHeight,
    }"
  >
    <el-upload
      v-model:file-list="newFileList"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :auto-upload="!useCustomApi"
      :disabled="props.disabled"
      :limit="maxCount"
    >
    </el-upload>
  </div>
</template>

<style scoped>
:deep(.el-upload-list--picture-card .el-upload-list__item),
:deep(.el-upload--picture-card) {
  width: var(--imgWidth);
  height: var(--imgHeight);
}
</style>
