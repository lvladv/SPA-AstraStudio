import React from "react";
import moment from "moment";

const Content = ({ tasks, appClose, endsAt, timeNow }) => {
  const format = "DDD : HH : mm : ss";
  const timeEnd = moment(endsAt);
  const date = moment(timeEnd.diff(timeNow)).format(format);

  return (
    <div className="background">
      {/* отоброжение таймера */}
      <span className="time">
        <p>{date}</p>
        <p className="time-title">
          <span>дней</span>
          <span>часов</span>
          <span>минут</span>
          <span>секунд</span>
        </p>
      </span>
      {tasks.map(item => (
        <span className="row" key={item.type}>
          {/*  картинка*/}
          <div className={`img-${item.type}`} />
          {/* подпись блока в зависимости от type */}
          <div className="progress-block">
            {item.type === "time" ? (
              <p>Выйграть три игры, каждую менее чем за 3 минуты</p>
            ) : null}
            {item.type === "kings" ? (
              <p>Выйграть три игры, разложив всех королей</p>
            ) : null}
            {item.type === "tournaments" ? (
              <p>Выйграть пять турниров подряд</p>
            ) : null}
            {/* прогресс бар */}
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            {/* возникающая кнопка */}
          </div>
          {item.progress === 100 ? (
            <button onClick={() => appClose(true)} className="button">
              Поставить рубашку
            </button>
          ) : null}
        </span>
      ))}
    </div>
  );
};

export default Content;
