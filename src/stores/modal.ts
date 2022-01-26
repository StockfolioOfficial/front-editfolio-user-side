import { observable } from 'mobx';

export interface modalContent {
  description: string;
  subDescription: string;
  actionButton?: () => void;
}

const modal = observable({
  isShow: false,

  modalContent: {
    description: '',
    subDescription: '',
    actionButton: () => undefined,
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
