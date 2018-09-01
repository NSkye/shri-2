### Сборка и запуск
```
npm i
gulp run
```
*Разработка осуществлялась на Linux Manjaro, как будет происходить сборка на Mac и Windows не могу точно знать*  
*Приложение было проверено в Chromium-браузерах, в Firefox и в Microsoft Edge для Android, проверить на работоспособность в Safari, к сожалению, не было возможности, так как не имею в распоряжении никакой техники от Apple*

### Использованные инструменты
- gulp
- Webpack
- stylus
- pug
- postcss  

#### Почему два сборщика
Gulp с плагином gulp-pug используется для сборки макетов и запуска dev-сервера. Сборка стилей, скриптов и автопрефиксинг осуществляется с помощью Webpack. Последовательность сборки следующая: Gulp собирает HTML -> Webpack собирает стили и скрипты -> Gulp запускает dev-server в локальной сети и отслеживает изменения в файлах. Два разных сборщика используется потому что с помощью Gulp гораздо проще отслеживать файлы, которые ещё не включены как зависимости, а также, потому что он идеально работает с browserSync, который позволяет запустить dev-server в локальной сети и в реальном времени просматривать изменения со всех устройств этой сети, Webpack же отлично справляется со сборкой ассетов благодаря loader'ам, что позволяет не задумываться о том, какая файловая структура будет в уже собранном проекте.  
#### Почему Stylus
В качестве CSS-препроцессора используется Stylus. Выбор пал на него по большей части благодаря тому, что он уже мне стал наиболее привычным. С синтаксисом, основанным на отступах сохраняется хорошая читаемость кода, плюс с помощью оператора & он позволяет поддерживать систему пространств имен, что тоже уберегает от большого количества проблем. Ну а переменные, циклы и миксины это и так понятно.  
#### Почему Pug 
В качестве шаблонизатора используется pug, я его раньше не использовал. Выбор пал на него по нескольким причинам: код в этом шаблонизаторе прописывается как чистый JS, что позволяет сохранять консистентность кодовой базы и не переключать по-многу раз внимание с одного синтаксиса на другой, вторая прична -- синтаксис основанный на отступов, благодаря которому код получается очень чистым и хорошо читаемым.  
postcss используется для автопрефиксинга CSS стилей для поддержки большего количества браузеров. 

### Файловая организация
* **component_name**
  * **component_name.js** *логика компонента*
  * **component_name.pug** *шаблон компонента*
  * **component_name.styl** *стили компонента*
  * **index.js** *сборка стилей и логики в одном месте*
  * **assets** *опционально папка с изображениями или другими ассетами, специфичными чисто для этого компонента*

Весь проект разбит на множество компонентов, каждый из которых расположен в отдельной папке. Компонент состоит обычно из файлов: .js, .pug и .styl, а так же имеет файл index.js, который их все рекваерит, чтоб потом было проще обращаться к этому компоненту. Опционально в компоненте может не быть каких-то из перечисленных файлов, однако, вся логика, стили и шаблоны компонента всегда находятся в одном месте.  
Все данные, которыми заполняется приложение, сгруппированы в одном файле `./src/data/data.json`, который передается при сборке в шаблонизатор, где он их расставляет на свои места. Также в отдельный файл вынесены переменные стилей `./src/variables.styl` и различные миксины, которые могут пригодиться сразу в нескольких компонентах. В `./src/assets/` расположены ассеты, которые могут пригодиться сразу в нескольких компонентах.

### Что сделано
Основная страница соответствует макету 1366x768, при ширине меньше 1364px производится адаптация под планшет, появляется скролл и элементы начинают располагаться друг под другом, при ширине меньше 768px производится адаптация под мобильную версию, навигация скрывается и появляется иконка для её вызова, в таком виде верстка соответствует мобильному макету.  
При увеличении ширины экрана, меняется размер блока Главное и Избранных сценариев, они продолжают занимать по половине экрана. Блок избранных сценариев с увеличением размера равномерно распределяет сценарии до конца страницы и размещает на экране больше сценариев, если они есть.  
- работает скролл плиточек мышкой, касанием, колесиком мышкой (при просмотре через browserSync сразу с двух устройств может не работать, это не баг, это особенность dev-server, так как он будет пытаться синхронизировать положение скролла. Просто закройте на одном из устройств и обновите страницу на другом)
- работает выпадающее меню, с анимированной иконкой и заблюриванием бэкграунда при его открытии (иконка меню правда классная, посмотрите)
- работает листание стрелочками, в том числе постранично в избранных сценариях (постраничное листание можно также колесиком)
- раскрывающийся список тегов в избранных устройствах в мобильной версии работает, но он ничего не фильтрует  
- футер всегда прикреплен к низу
- при высоте в 768px и ширине 1366px и больше скролла не будет
- при наведении на сценарии и устройства они меняют цвет и приобретают тень, тень нигде не обрезается
- всплывающие окна (при клике на устройство/сценарий всплывает окно с попапом из точки где было устройство, содержит заголовок, иконку и статус устройства), так как в данной реализации название устройства, его иконка и статус, извлекаются прямо через DOM-дерево и записываются в специальный глобальный объект, в начале страница из-за этого может подтармаживать, в реальной жизни, где эти данные будут асинхронно загружаться с сервера, такой проблемы не будет

*К сожалению, у меня не хватило времени, чтобы реализовать выполнить всё до конца. [Третьему заданию](https://github.com/NSkye/shri-3) мне удалось уделить значительно больше времени, так что, если у вас будут возникать сомнения, пожалуйста, обратите на него тоже внимание.*
