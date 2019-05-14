import React from "react";
import { render } from "react-dom";
import { Provider } from 'mobx-react';
import { LocaleProvider, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import DevTools from "mobx-react-devtools";
import stores from 'configs/stores';
import TodoList from 'components/TodoList';

message.config({
  duration: 2,
  maxCount: 1
});

render(
  <Provider {...stores}>
    <LocaleProvider locale={zhCN}>
      <div>
        <DevTools />
        <TodoList />
      </div>
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);