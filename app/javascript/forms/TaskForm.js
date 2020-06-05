import { pick, propOr } from 'ramda';

export default {
  defaultAttributes(attributes) {
    return {
      name: null,
      description: null,
      assignee: {},
      ...attributes,
    };
  },

  attributesToSubmit(task) {
    const pertmittedKeys = ['id', 'name', 'description'];

    return {
      ...pick(pertmittedKeys, task),
      assigneeId: propOr(null, 'id', task.assignee),
    };
  },
};
