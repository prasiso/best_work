export default [

    {
        name: 'Fazer orçamento',
        icon: 'nc-icon nc-ruler-pencil',
        children: [{
            name: 'Orçamento',
            path: '/forms/wizard'
        }]
    },
    {
        name: 'Ver orçamento',
        icon: 'nc-icon nc-single-copy-04',
        collapsed: true,
        children: [{
            name: 'Lista de orçamento',
            path: '/table-list/paginated'
        }]
    },
]