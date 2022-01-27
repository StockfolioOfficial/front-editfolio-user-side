import { observable } from 'mobx';

export interface modalContent {
  description: string;
  subDescription: string;
  actionButton?: () => void;
  isOnlyOk?: boolean;
}

const modal = observable({
  isShow: false,

  modalContent: {
    description: '',
    subDescription: '',
  } as modalContent,

  openModal() {
    this.isShow = true;
  },

  closeModal() {
    this.isShow = false;
  },

  setContent(content: modalContent) {
    this.modalContent = content;
  },
});

export { modal };
