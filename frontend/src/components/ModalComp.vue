<script setup>
import { useModalStore } from '/src/stores/modalStore';
import { onMounted } from 'vue';
import { ModalStatus } from "@/utilities/enums";

/** @type {import('@/stores/modalStore').useModalStore} */
const modalStore = useModalStore()

const props = defineProps({
    title: {
        type: String,
        default: "Modal Title",
    }
})

onMounted(() => modalStore.resetModal())
</script>


<template>
    <div id="modalpopup" class="modal-pop" :class="{
        showPopupBody: modalStore.isModalOpen == ModalStatus.OPEN,
        hidePopupBody: modalStore.isModalOpen == ModalStatus.CLOSE,
    }">
        <!-- modal box -->
        <div class="modal-dia" id="modalBox" :class="{
            showModalBoxContent: modalStore.isModalOpen == ModalStatus.OPEN,
            hideModalBoxContent: modalStore.isModalOpen == ModalStatus.CLOSE
        }">
            <!-- close modal -->
            <div class="modal-close" @click.stop="modalStore.close()">
                <i class="pi pi-times-circle"></i>
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
/* MODAL BODY/BACKDROP FRO MODAL BOX/CONTENT WITH STYLE AND ANIMATIONS */
.modal-pop {
    top: 0;
    left: 0;
    position: fixed;
    /* z-index: 1; */
    width: 100vw;
    height: 100vh;
    /* overflow: hidden; */
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    /* transition: opacity 0.4s ease; */
}

#modalpopup.showPopupBody {
    animation-name: popupBodyShow;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
}

#modalpopup.hidePopupBody {
    animation-name: popupBodyHide;
    animation-duration: 0.3s;
    animation-delay: 0.35s;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
}

@keyframes popupBodyShow {
    from {
        opacity: 0;
        visibility: hidden;
    }

    to {
        opacity: 1;
        visibility: visible;
    }
}

@keyframes popupBodyHide {
    from {
        opacity: 1;
        visibility: visible;
    }

    to {
        opacity: 0;
        visibility: hidden;
    }
}


/* MODAL BOX/CONTENT STYLES WITH ANIMATIONS */
.modal-dia {
    top: -500px;
    /* left: 50%; */
    transform: translate(50%, -500px);
    position: absolute;
    /* z-index: 1500; */
    width: 50%;
    min-height: 30%;
    max-height: 80%;
    padding: 10px;
    border-radius: 8px;
    background: white;
}

#modalBox.showModalBoxContent {
    animation-name: showModalBox;
    animation-duration: 0.3s;
    animation-delay: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
}

#modalBox.hideModalBoxContent {
    animation-name: hideModalBox;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
}

@keyframes showModalBox {
    0% {}

    70% {
        top: 50%;
        transform: translate(50%, -10%);
    }

    80% {
        top: 50%;
        transform: translate(50%, -30%);
    }

    100% {
        top: 50%;
        transform: translate(50%, -50%);
    }
}

@keyframes hideModalBox {
    from {
        top: 50%;
        transform: translate(50%, -50%);
    }

    /* 70% {
        top: 50%;
        transform: translate(50%, -30%);
    }

    80% {
        top: 50%;
        transform: translate(50%, -50%);
    } */

    to {
        top: -500px;
        transform: translate(50%, -500px);
    }
}

.modal-close {
    right: 10px;
    top: 10px;
    font-size: large;
    position: absolute;
    cursor: pointer;
}
</style>