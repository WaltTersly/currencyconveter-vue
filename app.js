new Vue({
    el:'#app',

    data: {
        currencies: {},
        amount:null,
        from:'',
        to:'',
        result: null,
        loading: false
    },

    //mounted hook
    mounted(){
        this.getCurrencies();
    },

    computed:{
        formattedCurrencies(){
            return Object.values(this.currencies);
        },

        calculateResult() {
            return (Number(this.amount)* this.result).toFixed(3);
        },

        disabled() {
            return this.amount === 0 || !this.amount || null || this.loading ;
        }
    },

    watch: {
        from(){
            this.result = null;
            this.amount = null;
        },

        to(){
            this.result = null;
            this.amount = null;
        }
    },

    methods: {
        getCurrencies() {
        
            const currencies = localStorage.getItem('currencies')

            if(currencies){
                this.currencies = JSON.parse(currencies);

                return;
            }
        
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=205e050356e317ff35c8')
                .then(response => {
                    this.currencies = response.data.results;
                    //local storage only accepts strings
                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                });
        },

        convertCurrency() {
            const key = `${this.from}_${this.to}`;
            this.loading = true;

            axios.get(`https://free.currconv.com/api/v7/convert?apiKey=205e050356e317ff35c8&q=${key}`)
             .then((response)=>{

                this.loading = false;
                 console.log(response);

                 this.result = response.data.results[key].val

             })
        }
    }
})