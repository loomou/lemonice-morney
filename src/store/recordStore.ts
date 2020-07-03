import recordListModel from '@/moudels/recordListMoudel';

export default {
  //record list
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
}