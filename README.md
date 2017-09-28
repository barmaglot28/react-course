# react-course
## React Lesson: 2 [ ReactDOM, lifecycle ]

`npm install` -- Устанавливаем все необходимые для работы пакеты из `package.json` (зависимости) <br/>
`npm run dev` -- Запускаем проект (запускается скрипт прописаный внутри `package.json` с ключем "dev")

> #### PS: Материал про "жизненный цикл" был честно взят [отсюда](https://maxfarseer.gitbooks.io/react-course-ru/content/zhiznennii_tsikl_komponenta.html), и немного откоректирован.

<!-- ![s](https://translate.google.com.ua/?hl=ru&tab=TT) -->

## Component Lifecycle
<!-- 

**Жизненный цикл в react** - это определенный набор функций которые вызываются при определенных обстоятельствах.
 -->

<!-- ---------------------------- -->
**Давайте представим задачу:**

Мы отрисовали компонент, в котором есть input, и хотим чтобы фокус установился в него. Когда я первый раз подумал "как это сделать", даже не придумал что и ответить.

Хорошо, допустим я знаю, что могу достучаться до DOM элемента через this.refs, но в какой момент стучаться?

Какие вообще "моменты" есть?

---

### Lifecycle methods

У каждого компонента, есть жизненый цикл (*lifecycle*): компонент будет примонтирован, компонент отрисовался, компонент будет удален и так далее...

У всех этих фаз есть методы, так называемые *lifecycle-methods*. Полный [список](https://facebook.github.io/react/docs/react-component.html) в документации выглядит крайне просто, предлагаю вам в конце урока еще раз его посмотреть, а пока хватит информации и здесь:

- **[componentWillMount](https://facebook.github.io/react/docs/react-component.html#componentwillmount)** - компонент будет примонтирован. В данный момент у нас нет возможности посмотреть DOM элементы.

- **[componentDidMount](https://facebook.github.io/react/docs/react-component.html#componentdidmount)** - компонент   примонтировался. В данный момент у нас есть возможность использовать refs, а следовательно это то самое место, где мы хотели бы указать установку фокуса. Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать **здесь**. 

**Этот метод подходит для решения нашей задачи:**
```javascript
var TestInput = React.createClass({
  componentDidMount: function() { //ставим фокус в input
    ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  },
  onBtnClickHandler: function() {
    console.log(this.refs);
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },
  render: function() {
    return (
      <div>
        <input
          className='test-input'
          defaultValue=''
          placeholder='введите значение'
          ref='myTestInput'
        />
        <button onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
      </div>
    );
  }
});
```

**Принцип прежний:** мы находим DOM-узел, считывам его свойство / вызываем его нативный метод, в данном случае - вызывем метод [focus()](https://developer.mozilla.org/ru/docs/Web/API/HTMLElement/focus).

- **[componentWillReceiveProps](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops)** - компонент получает новые props. Этод метод не вызывается в момент первого render'a. В официальной документации очень хороший пример, пожалуй скопирую его:

```javascript
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```

**Обратите внимание:** в этот момент, старые `props` доступны как `this.props`, а новые props доступны в виде `nextProps` аргумента функции.

Так же, если вы вызываете `setState` внутри этого метода - не будет вызван дополнительный `render`.

- **[shouldComponentUpdate](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate)** - должен ли компонент обновиться? На самом деле, обычно реакт сам отлично разбирается. Но иногда ручное управление позволяет существенно ускорить работу в "узких местах". С этим методом нужно работать очень аккуратно.

- **[componentWillUpdate](https://facebook.github.io/react/docs/react-component.html#componentwillupdate)** - вызывается прямо перед render, когда новые props и state получены. В этом методе нельзя вызывать `setState`.

- **[componentDidUpdate](https://facebook.github.io/react/docs/react-component.html#componentdidupdate)** - вызывается сразу после render. Не вызывается в момент первого render'а компонента.

- **[componentWillUnmount](https://facebook.github.io/react/docs/react-component.html#componentwillunmount)** - вызывается сразу перед тем, как компонент будет удален из DOM.

Конечно, в документации все описано немного подробнее. Я рекомендую с ней ознакомиться.

Главная мысль данного урока: у компонента есть стадии жизни, "в которые можно писать код". Да, пусть я выступаю здесь как "плохой программист", который советует вам писать свои велосипеды на разных стадиях жизни компонента, но именно таким образом вы быстро освоитесь.

Если же вы принадлежите к "правильному" типу программистов - пожалуйста, вот все lifecycle-методы. Выучите, перечитайте, осознайте - и пишите код без багов ;)

**Итого:** существует несколько lifecycle-методов, благодаря которым мы уже почти перестали "лазить" в DOM, а если и делаем это, то осознанно.

--- 

## ReactDOM

#### В первом уроке я уже в кратце рассказывал о том что такое `ReactDOM`, сейчас пройдемся более детально. 

ReactDOM - это модуль для работы с элементами DOM при этом не ломая идеологии React со своим виртуальным DOM. 

У него есть такие методы:
- **[render](https://facebook.github.io/react/docs/react-dom.html#render)** - обращается к DOM для того чтобы отобразить наше приложение. Отрисовывает только один компонент, по этому принято создавать один родительский компонент в котором будет находиться все наше приложение, чтобы отрисовать его одним запросом к `DOM` и не тратить на это больше ресурсы. 

- **[hydrate](https://facebook.github.io/react/docs/react-dom.html#hydrate)** - аналог функции `render` но используется в случае если мы используем рендеринг с сервера

- **[unmountComponentAtNode](https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode)** - Используется для удаления компонента из реального DOM, в последствии вызывает метод   

- **[findDOMNode](https://facebook.github.io/react/docs/react-dom.html#finddomnode)** - функция для поиска DOM элементов с учетом использования виртуального DOM.

<!-- - **[createPortal](https://facebook.github.io/react/docs/react-dom.html#createportal)** -  -->

**Задания (Делать в ветке playground):** 
1. Создать форму регистрации с полями email, логин, пароль, повторить пароль.
2. Написать валидацию формы, основные требования: пароли должны совпадать, email должен содержать символы   `@ .` и не содержать символы `/ , & % $ # ! * ( )`, начинаться и заканчиваться буквами.
3. При открытии страницы фокус должен быть автоматически стоять на первом поле для ввода, по нажатию на `enter` переключать фокус на другой элемент страницы 

