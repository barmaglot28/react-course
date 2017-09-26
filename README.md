# react-course
## lesson 1 [ сomponents, JSX, state, props ]

`npm install` -- Устанавливаем все необходимые для работы пакеты из package.json (зависимости) <br/>
`npm run dev` -- Запускаем проект (запускается скрипт прописаный внутри `package.json` с ключем "dev")

**React.js** - это библиотека которая была создана компанией facebook для того чтобы ускорить работу их проектов и вдобавок к этому упростить поддерживаемость кода.

Из известных вам сайтов на React написаны такие как slack, instagram, facebook, pinterest.

### Virtual DOM
Ребята из facebook знают о том что DOM c которым вы работаете очень медленный, так как ресурсоемкий и изначально был предназначен просто для отображения элементов.
По этому они и написали виртуальный аналог DOM на JavaScript, с которым делать различные манипуляции стали быстрее. Принцип работы `Virtual DOM` описан в картинке ниже:
![Виртуальный DOM](https://image.slidesharecdn.com/reactreduxintroduction-151124165017-lva1-app6891/95/react-redux-introduction-9-638.jpg?cb=1448383914)
<br/>
Виртуальный DOM это то к чему обращается реакт тогда когда мы создаем элемент средствами Реакта. 

Виртуальный DOM отличается от реального тем что он быстрый. Он оптимизирован таким образом что при изменении одного элемента - он изменит только этот элемент на странице, а не перезагрузит весь реальный DOM как это было раньше. И сделает это только тогда когда что-то изменилось.

**_Запомните:_** обращаться к элементам страницы по средствам реального DOM в React нельзя, так как это противоречит идеологии виртуального DOM и его использования.

### Components
Библиотека React использует компонентный подход, это означает что все индивидуальные элементы вашей страницы/сайта, являются компонентами. 
Компоненты это своего рода строительные единицы, которые разумеется можно переиспользовать.
Под компонентами я подразумеваю классы, которые описывают как визуальную часть 
индивидуального по смыслу элемента (например пост), так и логическую, например: функция отображения и 
скрытия полной информации о посте будет реализована в этом классе. 

Визуальная часть компонента в react реализована с помощью такой вещи как `jsx`.

Есть два типа компонентов, и их по разному наывают, я называю так - сложные и простые.

**Сложный компонент** - это класс, который наследуется от класса `Component` находящегося в библиотеке `React`, благодаря чему этот класс обретает определенные возможности, в частности такие как состояние и жизненный цикл.
У него есть обязательный метод который называется `render()` который обязательно должен возвращеть `jsx``

**Простой компонент** - это функция, которая ни от чего не наследуется, которая принимает на вход свойства, которые привыкли именовать как `props` (объект) и лишь возвращает jsx используя эти `props`, ну или не использует, это зависит от задачи.

Есть обязательная особенность, названия компонентов всегда должны начинатся с большой буквы.
Пример (для каждого компонента принято создавать свою папку):
```javascript
import React from 'react';

export default class ComponentExample extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <h1>Example</h1>
            </div>
        )
    }
}
```

Отлично, мы описали компонент, но для того чтобы этот компонент где-то отобразился - этого не достаточно. Для того чтобы наш компонент появился у нас на странице, нам необходимо его вывести, это делается так:
```javascript
import ReactDOM from 'react-dom';
import ComponentExample from 'path/to/ComponentExample';

ReactDOM.render(<ComponentExample/>, document.getElementById('app'));
```

**ReactDOM** - Модуль в котором собраны методы для работы с DOM, необходим тогда когда мы работаем с браузером. Такое разделение было сделано для того чтобы уменьшить вес основной библиотеки. Поскольку работа с DOM при создании десктопного приложения просто не нужна.

**ReactDOM.render()** - должен вызываться только один раз, это инициализация, при которой вставляет на страницу в выбранный нами элемент все наше приложение.
Принимает два параметра: 
1. Компонент который должен будет вставлен на страницу.
2. Элемент в который будет вставлен этот компонент.  

**app** - Это просто название элемента на странице .html в котрую мы вставляем наш компонент. 


Посмотреть на то как выглядят компоненты можно и нужно в ветке `components-examples`. <br/>
Для того чтобы в нее попасть, нужно выполнить команду: 
```{r, engine='bash', count_lines}
git checkout components-examples
```

**Напоминаю:** для того чтобы запустить приложение нам необходимо написать в консоли команду `npm install`, если консоль уведомляет нас о том что какой-то модуль не был найден - нужно его установить. Я уже внес все необходимые пакеты в зависимости проекта, по этому команды `npm install` должно хватить. Но в случае если это вдруг не так, или просто на будущее, дополнительные пакеты ставятся по такому принципу - `npm install [package-name] [--save | --save-dev]`, где `package-name` - имя необходимого нам пакета, а флаг `--save` or `--save-dev` записывает название и текущую версию в определенные объект в файле package.json - это нужно для того чтобы в будущем не устанавливать все модули в ручную, а просто написать `npm install` и все установиться.


### JSX
Поскольку react использует виртуальный dom все елементы которые вы хотите увидеть, необходимо создать.
Раньше вы делали это с помощью document.createElement();
такая же функция есть и в react, её принцип работы такой же, но отличие в том что функция из react создаёт елемент в виртуальном dom. Выглядит это приблизительно так:
```javascript
React.createElement('h1', null, 'hello world');
```
На выходе, в браузере появиться такой элемент:  `<h1>hello world<h1>`

Предположим, мы хотим делать сайт на реакте, на сайте очень много елементов, вложеностей и логики, если делать все это по средствам чистого react без jsx получиться трудно-читаемая каша, которую соответственно трудно поддерживать.

**Окей, что такое jsx?** <br/>
Это синтаксический сахар для функции createElement. Используя `jsx`, нам не нужно городить сложно читаемые createElement'ы, можно писать привычный "html" прямо в js, который в дальнейшем транспилируется в уже понятный браузеру createElement.

Но нет, это не совсем html внутри js. есть определённые отличия, например: атрибут "for" который предназначен для тега `label`, в jsx пишется как `htmlFor`, поскольку в js слово for является зарезервированым, привычный в html атрибут `class` тоже пишется иначе - `className`. поскольку в js слово class используется для обозначения класса, и ряд других исключений с которыми вы вероятно столкнетесь в дальнейшем.

Есть у него еще одна обязательная особенность, все теги обязательно нужно закрывать, как одинарные так и парные. <br/>
Пример: 
```javascript
<input type="text" />
<textarea></textarea>
```

### State & Props 
У компонентов реакт есть такие понятия как состояние и свойства.

Свойства есть у всех видов компонента, а состояния только у "сложных". 
Если мы описываем компонент с помощью класса, то и тот и другой будут являтся свойствами нашего класса, к которым внутри класса можно будет обратиться как к `this.props` и `this.state`.

**Свойства(props)** - это параметры которые мы можем передавать в компонент, выглядит это так будто мы пишем атрибуты тегу, но на деле, это передается в компонент которому мы это пишем в объект props.
Так можно делать как со сложными компонентами так и с простыми.
```jsx
<Post data={ {title: 'react.'} } />
/*    ^^^^ - надстройка над компонентом
      внутри компонента Post в props.data 
      будет находиться то что мы туда передаем. */
```

**Состояние (state)** - это объект, предназначеный для того чтобы хранить в нем орпеделенные свойства которые могут меняеться, например свойство я хочу при нажатии на кнопку отображить или скрывать что-то в моем компоненте, для этого я могу создать свойство visible в объекте `state` со значением `true` или `false` и при нажатии менять это значение на противоположное, а в jsx проверять значение этого свойства и в зависимости от этого отображать или скрывать определенный элемент, например. 

Изменить свойство объекта state можно только с помощью функции `setState()` которая появляется в нашем компоненте после того как мы расширим его от класса `Component`.

Функция `setState()` на вход принимает объект в котором необходимо указать свойство которое вы хотите изменить.
```javascript
changeStateExample() {
    this.setState({visible: !this.state.visible});
}
```
В примере выше я написал функцию которая при отработке изменит `state.visible` на противоположное значение.

**Но**, есть одно но. Функция `setState` изменяет `state` не сразу, а в определенный момент, перед повторной отрисовкой компонента. Под повторной отрисовкой компонента я подразумеваю повторный вызов метода `render()` у компонента в котором был изменен `state`, если в этом компоненте были использованы другие компоненты они тоже перересуются.  Если бы этого не происходило, то при изменении `state` мы бы не смогли как-то контролировать визуальную составляющую компонента.

**Задания (Делать в ветке playground):**
1. Создать компонент `Menu` и вывести его на страницу. (разделять на файлы)
2. Использовать `state` для того чтобы скрыть или отобразить элементы меню, скрывать и показывать меню по нажатию на кнопку.
3. Создать основной компонент в котором будет находится все наше приложение, и подключить к нему наше меню. 
4. Передавать в компонент меню свойство, которое будет массивом в котором лежат элементы меню, отрисовать элементы меню отталкиваясь от передаваемых в компонент "меню" данных. 