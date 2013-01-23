Ext.define('CG_TakePhoto.model.Photo', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'url', type: 'string' }
        ]
    }
});