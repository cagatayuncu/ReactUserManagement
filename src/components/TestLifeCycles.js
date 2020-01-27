import React, { Component } from 'react'

 class Test extends Component {
     constructor(props){
         super(props);
         this.state ={
             a:10
         }
         console.log("Constructor")//1. Çalışan kısım
     }
     componentDidMount() {
         console.log("componentDidMount")//3. Çalışan kısım
         //Api İsteklerinin Yapıldığı kısım
         this.setState({
             a:20
         })
     }
       componentDidUpdate =(prevProps, prevState) => {//4. çalışan kısım
           //prevState : Değişmeden Önceki State Tutan Değişken
           //prevProps : Değişmeden Önceki Props Tutan Değişken
           console.log(prevState)
           console.log(prevProps)
       }
       shouldComponentUpdate(){ // return edilen değere göre ( true, false) Render ve componentDidUpdate  fonksiyonları çalıştırır veya çalıştırmaz , default olarak true değer döner.
                                // Gerek duyulmayan kısımlarda false değeri kullanılarak performans arttırımı yapılabilir.
           console.log("shouldComponentUpdate")
           return true;

       }
       
    render() {
        console.log("Render")//2. ve Her güncellemeden(props,state değişiminden sonra) sonra çalışan kısım
        return (
            <div>
                
            </div>
        )
    }
}
export default Test;