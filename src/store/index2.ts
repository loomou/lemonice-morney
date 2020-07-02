import recordListModel from '@/moudels/recordListMoudel';
import tagListModel from '@/moudels/tagListMoudel';

const store = {
  //record list
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),

  //tag list
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t, id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};

export default store;