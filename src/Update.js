import * as R from 'ramda';
import axios from 'axios';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  SHOW_BACK: 'SHOW_BACK',
  FRONT_INPUT: 'FRONT_INPUT',
  BACK_INPUT: 'BACK_INPUT',
  SAVE_FRONT: 'SAVE_FRONT',
  DELETE_CARD: 'DELETE_CARD',
  UPDATE_BACK: 'UPDATE_BACK',
  SAVE_BACK: 'SAVE_BACK'
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function showBackMsg(showBack) {
  return {
    type: MSGS.SHOW_BACK,
    showBack,
  };
}

export const saveFrontMsg = { type: MSGS.SAVE_FRONT };
export const saveBackMsg = { type: MSGS.SAVE_BACK };

export function frontInputMsg(name) {
  return {
    type: MSGS.FRONT_INPUT,
    name,
  };
}

export function backInputMsg(back) {
  return {
    type: MSGS.BACK_INPUT,
    back,
  };
}

export function deleteCardMsg(id) {
  return {
    type: MSGS.DELETE_CARD,
    id,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, name: '', };
    }
    case MSGS.SHOW_BACK: {
      const { showBack } = msg;
      return { ...model, showBack, back: '', };
    }
    case MSGS.FRONT_INPUT: {
      const { name } = msg;
      return { ...model, name };
    }
    case MSGS.BACK_INPUT: {
      const { back } = msg;
      return { ...model, back };
    }
    case MSGS.SAVE_FRONT: {
      const updatedModel = add(msg, model);
      return updatedModel;
    }
    case MSGS.SAVE_BACK: {
      const updatedModel = add(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_CARD: {
      const { id } = msg;
      const cards = R.filter(
        card => card.id !== id
      , model.cards);
      return { ...model, cards };
    }
    case MSGS.UPDATE_BACK: {
      const { name } = msg;
      return { ...model, name };
    }
  }
  return model;
}

function add(msg, model) {
  const { nextId, name, back } = model;
  const card = { id: nextId, name, back };
  const cards = [...model.cards, card]
  return { ...model, cards, nextId: nextId + 1, name: '', back: '', showForm: false, };
}

export default update;