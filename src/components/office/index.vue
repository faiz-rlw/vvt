<script setup lang="ts">
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/index.css";

//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";

//引入VueOfficePdf组件
import VueOfficePdf from "@vue-office/pdf";

import { Empty } from "ant-design-vue";

const props = defineProps({
  // 文件路径
  url: {
    type: String,
  },
  // file格式文件
  file: {
    type: File,
  },
  // 文件类型
  types: {
    type: String as PropType<"docx" | "excel" | "pdf">,
    required: true,
  },
  // 空数据的图片
  emptyImage: {
    type: String,
  },
});

const isEmpty = computed(() => {
  return !((props.url || props.file) && props.types);
});

const emit = defineEmits(["renderedHandler", "errorHandler"]);

const fileSrc = ref();
onMounted(() => {
  if (props.file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(props.file);
    reader.onload = () => {
      fileSrc.value = reader.result;
    };
  } else if (props.url) {
    fileSrc.value = props.url;
  }
});

const fileComponent = {
  docx: VueOfficeDocx,
  excel: VueOfficeExcel,
  pdf: VueOfficePdf,
};

const renderedHandler = () => {
  emit("renderedHandler");
};

const errorHandler = () => {
  emit("errorHandler");
};
</script>

<template>
  <div :class="['h-full', isEmpty ? 'flex items-center justify-center' : '']">
    <component
      v-if="!isEmpty"
      :is="fileComponent[props.types]"
      :src="fileSrc"
      style="height: 100%"
      @rendered="renderedHandler"
      @error="errorHandler"
    ></component>
    <a-empty
      v-else
      description="暂无数据"
      :image="props?.emptyImage || Empty.PRESENTED_IMAGE_SIMPLE"
    />
  </div>
</template>
