import { Directive } from "vue";

interface LoadingElement extends HTMLElement {
  loadingElement: HTMLDivElement | null;
}

let useFatherRelative = false;
const div = document.createElement("div");
div.innerHTML =
  '<div class="loading_wrapper_area"><div class="wrapper"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="shadow"></div><div class="shadow"></div><div class="shadow"></div></div></div><div class="loading_wrapper_bg"></div>';

const loading: Directive<LoadingElement> = {
  mounted(el, binding) {
    // 判断是否在在全局上显示loading
    useFatherRelative = el.getAttribute("slefLoading") !== null;

    // 如果指令的值为true，将div元素添加到body下
    if (binding.value) {
      appendDomChild(el);
    }
  },
  updated(el, binding) {
    // 移除或添加div元素
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        appendDomChild(el);
      } else {
        removeDomChild(el);
      }
    }
  },
  unmounted(el) {
    // 元素被卸载，移除div元素
    removeDomChild(el);
  },
};

function appendDomChild(el: LoadingElement) {
  if (useFatherRelative) {
    el.appendChild(div);
    el.classList.add("loading_relative_arae");
  } else {
    document.body.appendChild(div);
    div.classList.add("loading_fixed_arae");
  }
}

function removeDomChild(el: LoadingElement) {
  try {
    if (useFatherRelative) {
      el.removeChild(div);
      el.classList.remove("loading_relative_arae");
    } else {
      document.body.removeChild(div);
      div.classList.remove("loading_fixed_arae");
    }
  } catch (err) {
    console.error(err);
  }
}

export default loading;
