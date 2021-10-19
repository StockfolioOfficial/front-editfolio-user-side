import { observable } from 'mobx';

export interface modalContent {
  description: string;
  subDescription: string;
  actionButton?: () => void;
}

export interface modalAction {
  isShow: boolean;
  openModal: () => void;
  closeModal: () => void;
  createModal: (newContent: modalContent) => modalContent;
}

const modal = observable<modalAction>({
  isShow: false,

  createModal(newContent) {
    return newContent;
  },

  openModal() {
    this.isShow = true;
  },
  closeModal() {
    this.isShow = false;
  },
});

export { modal };
