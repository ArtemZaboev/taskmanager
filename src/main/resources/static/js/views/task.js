define(function () {

function add(){
    var taskList_id=$$("taskList");
    var taskcreate11=$$("taskcreate11");
    taskList_id.add({
        'title': taskcreate11.elements.title.getValue(),
        'description': taskcreate11.elements.description.getValue(),
        'time': taskcreate11.elements.time.getValue()
    });
    taskcreate11.clear();
}

    webix.ui({

                view: "sidemenu",
                id: "menu",
                width: 600,
                position: "right",
                state: function (state) {
                    var toolbarHeight = $$("toolbar").$height;
                    state.top = toolbarHeight;
                    state.height -= toolbarHeight;
                },
                css: "my_menu",
        body: {
            rows: [
                {
                    gravity:0.7
                },
                {
                    cols: [
                        {
                            gravity:1
                        },
                        {
                            view: "form",
                            gravity:6.2,
                            id: 'taskcreate11',
                            borderless: true,
                            scroll: false,
                            elements: [
                                {view: "text", label: "Title", name: 'title',height:50},
                                {},
                                {view: "textarea", label: "Description", name: 'description',height:200},
                                {
                                    // view:"datepicker",
                                    // format:"%H:%i",
                                    // suggest:{
                                    //     type:"calendar",
                                    //     body:{
                                    //         type:"time",
                                    //         calendarTime:"%H:%i"
                                    //     }},
                                    view:'text',

                                    label: "Time", name: 'time', height:100},
                                {
                                    cols: [
                                        {gravity:2},
                                        {
                                            view: 'button',
                                            label: 'Create',
                                            height:65,
                                            click: function () {
                                                add();
                                                $$("menu").hide();

                                            }
                                        }
                                    ]
                                }
                            ],
                            select: true,
                            type: {
                                height: 40
                            }
                        },
                        {gravity:1}

                        ]
                },
                {
                    gravity:2
                }
            ]
        }

    });

    return {
        id:'main',
        type:"clean",
        css:{background: "rgba(21,255,46,0.15)"},

        rows: [
            {
            },
            {
                id:'toolbar',
                css:{background: "rgba(21,255,46,0.01)"},
                view:'toolbar',
                cols:[
                    {gravity:1},
                    {   view:'button',
                        label:'New Task',
                        width:120,
                        type:"iconTop", height:55,
                        css:"webix_primary",
                        // align:center,
                        click:function () {
                            taskList = $$('taskList');
                            if( $$("menu").config.hidden){
                                $$("menu").show();
                            }
                            else
                                $$("menu").hide();

                        }
                    },
                    {
                        view: "button",
                        label: 'Update',
                        width: 120,
                        type: "iconTop", height: 55,
                        css: "webix_primary",
                        click:function () {
                            webix.alert("Update");
                        }

                    },
                    {
                        view:'button',
                        label:'Delete',
                        width:120,
                        type:"iconTop", height:55,
                        css:"webix_primary",
                        // align:center,
                        click:function () {
                            var taskList_id = $$('taskList');
                            var item_id=taskList_id.getSelectedId();
                            // taskList_id.editRow(item_id);

                            if (item_id){
                                webix.confirm("Delete selected item?","confirm-warning")
                                    .then(function () {taskList_id.remove(item_id); })
                            }
                        }
                    },
                    {gravity:1}
                ]
            },
            {cols:[
                    {
                        gravity:0.3
                    },
                    {
                        rows:[
                            {
                                view: 'datatable',
                                id: 'taskList',
                                gravity:5,
                                columns: [
                                    // {id:'id'},
                                    {id: 'title', editor: 'text',width:150,header:'Name'},
                                    {id: 'description', editor: 'text',width:450,header:'Description'},
                                    {id: 'time', editor: 'text',width:150,header:'Time'}
                                ],
                                url: 'resource->/api/task',
                                save: 'resource->/api/task',
                                // autoheight: true,
                                autowidth: true,
                                height:720,
                                // columnWidth:300,
                                rowHeight:100,
                                // editable: true,
                                select: "row",
                                pager: 'taskPager',
                                datafetch: 7
                                // form: 'taskcreate'
                                // gravity: 3
                            },
                            {
                                view: 'pager',
                                id: 'taskPager',
                                size: 7,
                                group: 3,
                                template: "{common.first()} {common.prev()}{common.pages()} {common.next()}{common.last()}",
                                animate: {subtype:"flip"}
                            }
                    ]
                    },
                    {gravity:0.3}
                    ]}

        ]


    }
});