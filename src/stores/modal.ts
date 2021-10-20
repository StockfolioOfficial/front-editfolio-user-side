import { observable } from 'mobx';

const modal = observable({
  isShow: false,

  openModal() {
    this.isShow = true;
  },
  closeModal() {
    this.isShow = false;
  },
});

export { modal };
