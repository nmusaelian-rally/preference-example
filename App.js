Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //save app preferences
        Rally.data.PreferenceManager.update({
            appID: this.getAppId(),
            filterByUser: true,
            settings: {
                myTag: 'Spike One',
            },
            success: function(updatedRecords, notUpdatedRecords) {
                console.log('updated prefs');
                Rally.data.PreferenceManager.load({
                    appID: this.getAppId(),
                    filterByUser: true,
                    success: function(prefs) {
                        this._makeGrid(prefs)
                    },scope:this
                });
            },scope:this
        }); 
    },    
    _makeGrid:function(prefs){
        console.log('prefs', prefs)
        this.add({
            xtype: 'rallygrid',
            columnCfgs: [
                'FormattedID',
                'Name',
                'Owner',
                'Tags'
            ],
            context: this.getContext(),
            enableEditing: false,
            showRowActionsColumn: false,
            storeConfig: {
                model: 'userstory',
                filters:[
                    {
                        property:'Tags.Name',
                        operator: 'contains',
                        value: prefs.myTag
                    }
                ]
            }
        });    
    }    
});
