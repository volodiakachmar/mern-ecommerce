/**
 *
 * scrollToTop.js
 * scroll restoration
 */

import React from 'react';

import { withRouter } from 'react-router-dom';

// withRouter - это функция высшего порядка (HOC) в React, предоставляемая библиотекой react-router-dom.
// Она используется для оборачивания компонента, чтобы предоставить ему доступ к объекту history, location и match, который предоставляется React Router.

// Когда компонент оборачивается в withRouter, он получает доступ к объекту history, который содержит информацию о браузерной истории, такой как текущий URL, 
// методы для навигации и т.д. Это позволяет компонентам использовать маршрутизацию в своей логике, например, перенаправлять пользователя на другие страницы 
// при определенных условиях или обрабатывать динамические параметры маршрута.

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
