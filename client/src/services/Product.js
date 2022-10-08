import Api from '@/services/Api'

export default {
    index() {
        return Api().get('Products')
    },
    show(ProductId){
        return Api().get('Product/',ProductId)
    },
    post(Product){
        return Api().post('Product', Product)
    },
    put(Product){
        return Api().put('Product/'+Product.id, Product)
    },
    delete(Product){
        return Api().delete('Product/'+Product.id, Product)
    },
}