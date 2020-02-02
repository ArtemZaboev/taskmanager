requirejs.config({
    baseUrl: 'js'
})



function buildRoute(view) {
    return function () {
        webix.ui({
            id: 'root',
            rows: [
                view
            ]
        }, $$('root'))
    }
}

require(
    ['views/task','util/resourceProxy'],function (task, resourceProxy) {
        webix.ready(function () {
            webix.ui({
                container: 'app',
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                type:"clean",
                rows: [
                    {
                        view: 'toolbar',
                        css:'toolbarColor',
                        color:'',
                        cols: [
                            {}, {}, {}, {}, {}, {}, {},{},{},{},{},{},
                            {
                                view:'button',
                                label:"Send to email",
                                type:"icon",
                                icon:"mdi mdi-email",
                                height:55,
                                css:"webix_danger",
                                width:80,
                                // align:center,
                                click:function () {
                                    // var taskList_id = $$('taskList');
                                    // var item_id=taskList_id.getSelectedId();
                                    webix.ajax().post('/api/task/mail');
                                }
                            },
                            {
                                view:'button',
                                value:'Logout',
                                type:"icon", icon:"mdi mdi-account",
                                css:"webix_danger",
                                width:80,
                                align:'center',
                                // gravity:1,
                                click:function () {
                                    window.document.location='/logout'
                                }

                            },
                            {}

                            ]
                    },
                    {id: 'root',
                    }
                ]

            });


            routie({
                '': buildRoute(task),


            })


        });


    }
)




