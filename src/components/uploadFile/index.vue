<script setup lang="ts">
import type {
  UploadChangeParam,
  UploadProps,
  UploadFile,
} from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
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
  // // 列大小
  // columnSize: {
  //   type: [String, undefined] as PropType<String | undefined>,
  // },
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
  // 是否只读
  readOnly: {
    type: Boolean,
    default: false,
  },
  // 是否使用自定义请求
  useCustomApi: {
    type: Boolean,
    default: false,
  },
  // 是否阻止上传请求
  usePreventUpload: {
    type: Boolean,
    default: true,
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

// 未设置列大小，则自适应
// const columnSize = computed<string>(() => {
//   return props.columnSize
//     ? props.columnSize.toString()
//     : `minmax(${props.imgWidth},1fr)`;
// });

// 渲染图片文件列表
const newFileList: Ref<UploadProps["fileList"]> = ref([]);
watch(
  () => props.fileList,
  (newVal) => {
    newFileList.value = judgeFileList(newVal);
  },
  { deep: true }
);

// 是否能够上传图片
const uploadDisable = computed<boolean>(() => {
  return props.disabled || props.readOnly;
});

onMounted(() => {
  newFileList.value = judgeFileList(props.fileList);
});

/**
 * @description 对文件类型和文件大小的校验
 * @param {string} type 上传文件的类型
 * @param {number} size 上传文件的大小
 */
function validateFile(type: string = "unknow", size: number = 9999): boolean {
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
  return list && list.length
    ? (list.map((item, index) => {
        if (typeof item === "string") {
          return {
            uid: -index - 1,
            name: `文件${index + 1}`,
            url: item,
            status: "done",
          };
        } else if (typeof item === "object") {
          return {
            uid: item.uid || -index - 1,
            name: item.name || `文件${index + 1}`,
            url: item.url,
            status: "done",
          };
        } else {
          return {
            uid: -index - 1,
            name: `文件${index + 1}`,
            url: "",
            status: "done",
          };
        }
      }) as UploadProps["fileList"])
    : [];
}

/**
 * @description 上传文件的逻辑
 * @param {file} file
 */
function uploadFile(file: any) {
  const { name } = file;
  if (props.useCustomApi) {
    emit("customRequest", file);
  } else {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    console.log("请求");
    // apis.test.uploadFile(formData).then((res: RESPONSE_COMMON_TEYPE) => {
    //   let list: UploadProps["fileList"] = newFileList.value;
    //   list && list.push(res.data);
    //   emit("changeFileList", list);
    // });
  }
}

/**
 * @deprecated 文件列表变化
 * @param {UploadChangeParam} info
 */
function change(info: UploadChangeParam) {
  const { file, fileList } = info;

  if (props.usePreventUpload) {
    emit("fileObjectList", fileList);
  } else if (file.status !== "removed") {
    if (validateFile(file.type, file.size)) {
      uploadFile(file);
    }
    newFileList.value?.pop();
  }
}

function downloadImage(file: UploadFile) {
  if (!props.disabled && file.url) {
    window.open(file.url);
  }
}

/**
 * @deprecated 图片预览
 * @param {File} file
 */
const handlePreview = async (file: UploadFile) => {

  let arr =
    newFileList.value?.map((item) => {
      return item.url || item.thumbUrl;
    }) || [];
  let fileIndex = arr.findIndex(
    (item) => item === file.thumbUrl || item === file.url
  );
  preview({
    images: arr,
    index: fileIndex,
  });
};
</script>

<template>
  <!-- class="image_grid"
      '--columnSize': columnSize, -->

  <div
    :style="{
      '--imgWidth': props.imgWidth,
      '--imgHeight': imgHeight,
    }"
  >
    <a-upload
      v-model:file-list="newFileList"
      list-type="picture-card"
      :before-upload="() => false"
      :disabled="props.disabled"
      :maxCount="props.maxCount"
      :showUploadList="{
        showPreviewIcon: true,
        showRemoveIcon: !uploadDisable,
        showDownloadIcon: !disabled,
      }"
      :width="props.imgWidth"
      :height="imgHeight"
      @onDownload="downloadImage"
      @change="change"
      @preview="handlePreview"
    >
      <PlusOutlined />
      <div style="margin-top: 8px">上传</div>
    </a-upload>
  </div>
</template>
<style scoped>
/* .image_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--columnSize));
  gap: 1rem;
  height: 300px;
} */

:deep(.ant-upload-list-picture-card-container),
:deep(.ant-upload.ant-upload-select-picture-card) {
  width: var(--imgWidth) !important;
  height: var(--imgHeight) !important;
}
:deep(.ant-upload.ant-upload-select-picture-card > .ant-upload) {
  flex-direction: column !important;
}
</style>
