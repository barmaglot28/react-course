import React from 'react';

const Header = (props) => (
    <header>
        <h1>React Lesson: 3 [ router, redux ]</h1>
        <h3>Урок третий</h3>
        <p className="description">
            Что вы должны осознать сегодня: router, redux <br/>
            <b>Задания на сегодня:</b>
        </p>
        <ul className="tasks">
            <li>Добавить возможность редактировать пост [redux, actions] (2 балла)</li>
            <li>Добавить возможность сортировать посты </li>
            <li>
                Исправить работу функции contentView написаной внутри компонента "Post" так,
                чтобы развернутым был только один компонент. [redux] (3 балла)
            </li>
            <li>
                Добавить стилизации на свое усмотрение, человек дизайн которого мне понравиться
                больше всего получит дополнительный балл.
            </li>
            <li>
                Добавить компоненту AddPost возможность добавлять `links` (3 балла)
            </li>
        </ul>

        <p>
            Дополнительно:
        </p>
    </header>
);

export default Header;