import type { MouseEvent } from "react";
import classNames from "classnames";
import { validScores } from "lib/constants";
import "./Actions.css";

type ActionsProps = {
  show: boolean;
  myScore: string | null;
  onVote: (e: MouseEvent<HTMLButtonElement>) => void;
  onShow: () => void;
  onClear: () => void;
};

const Actions = ({ show, myScore, onVote, onShow, onClear }: ActionsProps) => (
  <div className="Actions">
    <ul className="scores">
      {validScores.map((item) => (
        <li key={item}>
          <button
            onClick={onVote}
            className={classNames({ selected: item === myScore })}
            value={item}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
    <ul className="operations">
      {show ? (
        <li>
          <button onClick={onClear} className="danger">
            Clear
          </button>
        </li>
      ) : (
        <li>
          <button onClick={onShow}>Show</button>
        </li>
      )}
    </ul>
  </div>
);

export default Actions;
