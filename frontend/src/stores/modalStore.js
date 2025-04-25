import { defineStore } from "pinia";
import { ref } from "vue";
import { ModalStatus } from "@/utilities/enums";
export const useModalStore = defineStore('modalStore', () => {
    const isModalOpen = ref(null)

    function resetModal() {
        isModalOpen.value = null;
    }

    function open() {
        isModalOpen.value = ModalStatus.OPEN
        // _openBody()
        // modalBox.classList.remove('hideModalBoxContent');
        // modalBox.classList.add('showModalBoxContent');
    }

    function close() {
        isModalOpen.value = ModalStatus.CLOSE
        console.log(isModalOpen.value)
        // showModalBoxContent
        // hideModalBoxContent
        //remove the showpop class
        // add the hidepop class
        // close the body/backdrop
        // modalBox.classList.remove('showModalBoxContent');
        // modalBox.classList.add('hideModalBoxContent');
        // _closeBody()
    }


    // function _openBody() {
    //     modalBody.classList.remove('hidePopupBody')
    //     modalBody.classList.add('showPopupBody')
    // }

    // function _closeBody() {
    //     modalBody.classList.remove('showPopupBody')
    //     modalBody.classList.add('hidePopupBody')
    // }

    return { isModalOpen, open, close, resetModal }
})