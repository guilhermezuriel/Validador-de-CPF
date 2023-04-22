//Criando um validador de CPF, utilizando classes e conceitos de POO

class CPF{
    constructor(cpf){
        Object.defineProperty(this, 'cpf',{
            enumerable:true, 
            writable: false,
            configurable:false,
            value: cpf,
        });
    }

    get cpf(){
        return this.cpf;
    }

    validaCPF(){
        let cpflimpo = this.cpf.replace(/\D+/g, '');
        const digitos = cpflimpo.slice(0,9);
        const vfsequencia = this.cpf.charAt(0).repeat(11);
        const comparacpf = CPF.criaCPF_valido(digitos);
        if (comparacpf === cpflimpo && comparacpf !== vfsequencia) return 'O cpf é válido'
        else{return 'O cpf é inválido'};
    }

    static criaCPF_valido(digitos){
        const stringDigitos = digitos.split('');
        while(stringDigitos.length !== 11){
            const soma = somaTotal(stringDigitos);
            const novoDigito = maisDigito(soma);

            stringDigitos.push(novoDigito);
        }
        return stringDigitos.join('');
    }

    static estilizaCPF(cpf){
        let cpfestilizado = `${cpf[0]}${cpf[1]}${cpf[2]}-${cpf[3]}${cpf[4]}${cpf[5]}-${cpf[6]}${cpf[7]}${cpf[8]}.${cpf[9]}${cpf[10]}`;
        return cpfestilizado 
    }
}

//Funções auxiliares

//Realiza a adição do número ao CPF;
function maisDigito(total){
    const novodigito = (11 - (total % 11));
    if (novodigito > 9) return 0;
    return novodigito;
};

//Realiza a soma total dos números no CPF;
function somaTotal (stringDigitos){
    return stringDigitos.reduce((acumulador, valor, indice) =>{
        let n = stringDigitos.length + 1 - (indice);
        return acumulador += Number(valor) * n   
    }, 0);
};

//Função que cria um CPF válido
function geradorCPF(){
    let cpfli = [];
    for (let i = 0 ; i < 9 ; i++){
        cpfli.push(Math.floor(Math.random()*10));
    }
    cpfli = cpfli.join('');
    const cpfcriado = CPF.criaCPF_valido(cpfli);
    return CPF.estilizaCPF(cpfcriado);
};

//Testando o código diretmente pelo console;
const cpf1 = new CPF('070.987.720-03');

console.log(cpf1, '\n', cpf1.validaCPF());

console.log('\n ######### \n');

let novocpf = geradorCPF();
const cpf2 = new CPF(novocpf);

console.log(novocpf,'\n',cpf2, '\n', cpf2.validaCPF());

console.log('\n ######## \n');

const cpf3 = new CPF('000.000.000-00');

console.log(cpf3, '\n', cpf3.validaCPF())

console.log('\n ######## \n');

const cpf4 = new CPF('070.987.720-23');

console.log(cpf4, '\n', cpf4.validaCPF());