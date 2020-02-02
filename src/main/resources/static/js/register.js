require(
    [],function () {
        webix.ready(
            function () {
                webix.ui({
                    height:300,
                    container:'register',
                    id:'registerform',
                    view:"form",
                    elements:[
                        { view:"fieldset", label:"Registration form",
                            body:{
                                rows:[
                                    { view:"text", label:"Username",height:50,name:'username'},
                                    { view:"text",type:'password', label:"Password",height:50,name:'pass'},
                                    { view:"text",type:'email', label:"Email",height:50,name:'email'}

                                ]
                            }},
                        { cols:[
                                {gravity:1.5},
                                {
                                    view:"button", label:"Sign up" , type:"form" ,height:50,

                                    click:function () {
                                        var values=$$('registerform').getValues();
                                        webix.ajax().post('/api/registration',values,function (args) {
                                            window.document.location='/login'
                                        })

                                    }
                                },


                            ]}
                    ]


                })
            }
        )
    }
)