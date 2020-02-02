require(
    [],function () {
        webix.ready(
            function () {
                webix.ui({
                    height: 300,
                    container: 'login',
                    rows:[
                        {
                            view:'button',
                            label:'Sign up',
                            height:50,
                            click:function () {
                                window.document.location='/registration'
                            }


                        },
                        {
                            id: 'loginform',
                            view: "form",
                            elements: [
                                {
                                    view: "fieldset", label: "Login form",
                                    body: {
                                        rows: [
                                            {view: "text", label: "Username", height: 50, name: 'username'},
                                            {
                                                view: "text",
                                                type: 'password',
                                                label: "Password",
                                                height: 50,
                                                name: 'pass'
                                            },

                                        ]
                                    }
                                },
                                {
                                    cols: [
                                        {gravity: 1.5},
                                        {
                                            view: "button", label: "Login", type: "form", height: 50,

                                            click: function () {
                                                var values = $$('loginform').getValues();
                                                webix.ajax().post('/login', values, function (args) {
                                                    window.document.location = '/'
                                                })

                                            }
                                        }


                                    ]
                                }
                            ]
                        },

                    ]

                })
            }
        )
    }
)