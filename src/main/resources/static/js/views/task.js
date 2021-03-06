define(function () {

    function add(){
        var taskList_id=$$("taskList");
        var taskcreate11=$$("taskcreate11");
        var timeV=taskcreate11.elements.time.getValue();
        var time=timeV.getHours()+" h  "+timeV.getMinutes()+" m";
        taskList_id.add({
            'title': taskcreate11.elements.title.getValue(),
            'description': taskcreate11.elements.description.getValue(),
            'time': time
        });
        taskcreate11.clear();
    }

    webix.ui({
        view:"popup",
        body: {
            view: 'form',
            id: 'newform',
            elements: [
                {view: "text", name: "title"},
                {view: "textarea", name: "description",height:100},
                {view: "text", name: "time"},
                {
                    view: "button", label: "Save", type: "form", click: function (id) {
                        var form = $$(id).getFormView();
                        var values = form.getValues();
                        $$("taskList").updateItem(values.id, values);
                    }
                }
            ]
        }

    });

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
                                    view:"datepicker",
                                    format:"%H:%i",
                                    suggest:{
                                        type:"calendar",
                                        body:{
                                            type:"time",
                                            calendarTime:"%H:%i"
                                        }},
                                    // view:'text',

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
                        type:"iconTop", height:58,
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
                        view: "menu",
                        data: [
                            {
                                id: "exportTo", value: 'Export to',
                                submenu: [
                                    {id:"pdf",value: "PDF"},
                                    {id:"excel",value: "Excel"},
                                    {id:"print",value: "Print"}
                                ]
                            }
                        ],
                        type:{
                            height:53,
                            width:120
                        },
                        width: 120,
                        css: "webix_primary",
                        on: {
                            onMenuItemClick: function (id) {
                                if(id=='pdf'){
                                    webix.toPDF($$("taskList"), { autowidth:true,autoheight:true,
                                                columns:{ title:true, description:true,time:true},
                                                filename:"taskList" });
                                }
                                else if(id=='excel'){
                                    webix.toExcel($$("taskList"));
                                }
                                else if(id=='print'){
                                    webix.print($$("taskList"),{scroll:true});
                                }
                            }
                        }


                    },
                    {
                        view:'button',
                        label:'Delete',
                        width:120,
                        type:"iconTop", height:58,
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
                        // gravity:0.1
                    },
                    {
                        rows:[
                            {
                                view: 'datatable',
                                id: 'taskList',
                                // gravity:8,
                                spans:true,
                                drag:true,
                                columns: [
                                    {id:'id',width:100},
                                    {id: 'title', width:200,header:'Name'},
                                    {id: 'description',width:400,header:'Description'},
                                    {id: 'time', width:200,header:'Time'},
                                    {id:'completed',width:150,css:"center",template:"{common.checkbox()}",
                                        header:'Completed', editor:"checkbox"}
                                ],
                                url: 'resource->/api/task',
                                save: 'resource->/api/task',
                                autowidth: true,
                                height:700,
                                rowHeight:109,
                                editable: true,
                                select: "row",
                                pager: 'taskPager',
                                datafetch: 6,
                                form: 'newform'
                            },
                            {
                                view: 'pager',
                                id: 'taskPager',
                                size: 6,
                                group: 3,
                                template: "{common.first()} {common.prev()}{common.pages()} {common.next()}{common.last()}",
                                animate: {subtype:"flip"}
                            }
                        ]
                    },
                    {
                        // gravity:0.1
                    }
                ]}

        ]


    }
});


