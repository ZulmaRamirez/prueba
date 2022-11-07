const HOJA_DE_CALCULO= "https://docs.google.com/spreadsheets/d/1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8/edit#gid=0";
SHEET_ID = "1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8";
const TOKEN = "ya29.a0AeTM1ifJ7dLH3jyTtIYlpHD4w9mDkcOQySzvycIl2549mkNYzCXV7RPGxs9TIvcch1MmlGKYCCR0nYvWTaJziV5lmfSlhBCNjvWKYQyxUyxTc7P6BT7VS6ZsNZbg79ySJsW4nqD_oJfk8QCrfUp37GYTen2vaCgYKAfoSARESFQHWtWOm4ev_6spkHEVH-FduSoK4zw0163";
/*"https://sheets.googleapis.com/v4/spreadsheets/1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8/values/hojaGastos!A1:D";*/


fetch (
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaGastos!A1:D` ,
    {
        headers:  
        {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${TOKEN}`
        }  
    }
).then(function(response) {
   response.json().then((data) =>{
    const VALUES = data.values
    console.log(VALUES);
    const LISTA = document.getElementById("lista-gastos") //indico que todo lo de lista se observara dentro de lista-gastos

    for(let i = 0; i < VALUES.length; i++)
    {
        //contenedor de todas las filas
        const GASTOS = document.createElement("div")
        GASTOS.className = "gastos-item"

        //nombre producto
        const MEDIO_DE_PAGO = document.createElement("span")
        MEDIO_DE_PAGO.className = "item mediodepago"
        MEDIO_DE_PAGO.innerHTML = VALUES[i][0]
        
        //nombre precio
        const CONCEPTO = document.createElement("span")
        CONCEPTO.className = "item concepto"
        CONCEPTO.innerHTML = VALUES[i][1]

        //nombre bebida
        const FECHA = document.createElement("span")
        FECHA.className = "item fecha"
        FECHA.innerHTML = VALUES[i][2]

        //nombre costo bebida
        const MONTO = document.createElement("span")
        MONTO.className = "item monto"
        MONTO.innerHTML = VALUES[i][3] 
        

        //Gastos recoge los datos como hijos
        GASTOS.appendChild(MEDIO_DE_PAGO)
        GASTOS.appendChild(CONCEPTO)
        GASTOS.appendChild(FECHA)
        GASTOS.appendChild(MONTO)
        


        LISTA.appendChild(GASTOS)

    }

    const GASTO_GENERAL =  document.getElementById("totalGastos") //indico que todo lo de lista se observara dentro de total-gastos

        for (let i = 1; i < VALUES.length; i++)
        {
            //contenedor de todas las filas
                const  COSTO = document.createElement("total")
                COSTO.className = "total-item"
                
            //Convertir el costo string en number para efectuar la sumatoria de los gastos
                const COSTOTAL = document.createElement("span")
                COSTOTAL.className = "costosTotal"
                COSTOTAL = parseFloat(VALUES[i][3]).valueOf();
                COSTOTAL.innerHTML = sumaGastos();
         
                function sumaGastos (COSTOTAL){
                    let total = COSTOTAL.filter(Element => COSTOTAL > 0 );
                    return total.reduce((suma, value) => suma + value, 0);
                }
                console.log("El total de los gastos es", + sumaGastos);

                COSTO.appendChild(COSTOTAL);
                GASTO_GENERAL.appendChild(COSTO);
        }

     }).catch ((error)=>{
        
         })
    })
 