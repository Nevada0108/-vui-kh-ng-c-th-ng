async function getData(){
    const res = await fetch('https://6767c148560fbd14f18e4f65.mockapi.io/hocsinh')
    const data = await res.json();
    console.log(data);
    // const name = data.map((item)=>{
    //     console.log(item.name);
        
    // })
    const name1 = data.filter((item)=>{
        return item.id<5;    
})
console.log(name1)
}

getData();



localStorage.setItem('id','5');

const iduser= localStorage.getItem('id');
console.log(iduser);

async function getDatauser(i){
    const res = await fetch('https://6767c148560fbd14f18e4f65.mockapi.io/hocsinh/'+i);
    const data = await res.json();
    console.log(data.name);
}

getDatauser(iduser)

const sum = (a,b) => console.log(a+b);
sum(2,9);




