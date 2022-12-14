import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";
import { showFormMsg, showBackMsg, frontInputMsg, backInputMsg, saveFrontMsg, saveBackMsg, deleteCardMsg } from "./Update";

const { div, button, form, label, input, thead, tbody, tr, th, td } = hh(h);

const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded";

const tableHeader = thead([tr([cell(th, "text-left", "Cards")])]);

function cell(tag, className, value, id = 0) {
  return tag({ className, id }, value);
}

function cardRow(dispatch, className, card, back) {
  return div({ className: "w-60 h-60 bg-amber-300 inline-block ml-2 text-ellipsis overflow-hidden" }, [
    cell(td, "px-1 py-2", card.name),
    cell(td, "px-1 py-2 text-right", [
      button(
        { 
          className: "hover:bg-gray-200 text-sm",
          onclick: () => dispatch(showBackMsg(card.id))
        },
        "Show Answer"
        ),
    ]),
    button(
      {
        className: `${btnStyle} bg-gray-500 hover:bg-gray-700`,
        onclick: () => dispatch(deleteCardMsg(card.id)),
      },
      "DELETE"
    ),
  ]);
}

function tableView(dispatch, cards) {
  if (cards.length === 0) {
    return div({ className: "pt-8 text-center" }, "No Cards... Make a new Card!!! ");
  }
  return div({className: "mt-4" }, [ tableHeader, cardsBody(dispatch, "", cards) ]);
}

function backRow(dispatch, className, back) {
  return div({ className: "w-60 h-60 bg-amber-300 inline-block ml-2 text-ellipsis overflow-hidden" }, [
    cell(td, "px-1 py-2", back.back),
    cell(td, "px-1 py-2 text-right", [
      button(
        {
          className: `${btnStyle} bg-gray-500 hover:bg-gray-700`,
          onclick: () => dispatch(deleteCardMsg(card.id)),
        },
        "DELETE"
      ),
    ]),
  ]);
}

function cardsBody(dispatch, className, cards) {
  const rows = R.map(R.partial(cardRow, [dispatch, "odd:bg-grey-100 even:bg-gray-200"]), cards);
  const rowsWithTotal = [...rows, row(cards)];
  return tbody({ className }, rowsWithTotal);
}

function row(cards) {
  const row = R.pipe(
    R.map((card) => card.back),
  )
  (cards);
}

function fieldSet(labelText, inputValue, placeholder, oninput) {
  return div({ className: "grow flex flex-col" }, [
    label({ className: "text-gray-700 text-sm font-bold mb-2" }, labelText),
    input({
      className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",
      placeholder,
      type: "text",
      value: inputValue,
      oninput,
    }),
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "flex gap-4 justify-center" }, [
    button({className: `${btnStyle} bg-green-500 hover:bg-green-700`, type: "submit", onclick: () => dispatch(saveweatherMsg)}, "SAVE"),
    button({className: `${btnStyle} bg-red-500 hover:bg-red-700`, type: "button", onclick: () => dispatch(showFormMsg(false))},  "CANCEL")
  ]);
}

function formView(dispatch, model) {
  const { name, back, showForm } = model;
  if (showForm) {
    return form({className: "flex flex-col gap-4", onsubmit: (e) => { e.preventDefault(), dispatch(saveFrontMsg) }}, [
        div({ className: "flex gap-4" }, [
          fieldSet("Frontcard", name, "Enter Frontcard text...", (e) => dispatch(frontInputMsg(e.target.value))),
          fieldSet("Backcard", back || "", "Enter Backcard text...", (e) => dispatch(backInputMsg(e.target.value))),
        ]),
        buttonSet(dispatch),
      ]);
  }
  return button(
    {
      className: `${btnStyle} max-w-xs`,
      onclick: () => dispatch(showFormMsg(true)),
    },
    "Create Flashcard"
  );
}

function view(dispatch, model) {
  return div({ className: "flex flex-col" }, [formView(dispatch, model), tableView(dispatch, model.cards)]);
}

export default view;