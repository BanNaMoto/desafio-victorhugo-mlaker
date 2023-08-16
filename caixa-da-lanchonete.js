class CaixaDaLanchonete {
    constructor()
    {
        this.cardapio = [
            {codigo: 'café', descrição: 'Café', valor: 3.00},
            {codigo: 'chantily', descrição: 'Chantily (extra do Café)', valor: 1.50},
            {codigo: 'suco', descrição: 'Suco Natural', valor: 6.20},
            {codigo: 'sanduiche', descrição: 'Sanduíche', valor: 6.50},
            {codigo: 'queijo', descrição: 'Queijo (extra do Sanduíche', valor: 2.00},
            {codigo: 'salgado', descrição: 'Salgado', valor: 7.25},
            {codigo: 'combo1', descrição: '1 Suco e 1 Sanduíche', valor: 9.50},
            {codigo: 'combo2', descrição: '1 Café e 1 Sanduíche', valor: 7.50}
        ];

        this.combos = ['combo1', 'combo2'];

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03
    }

    calcularValorDaCompra(metodoDePagamento, itens) 
    {
        if (itens.length === 0)
        {
            return "Não há itens no carrinho de compra!";
        }
    
    
        let valorTotal = 0;
        let itensPrincipais = [];
        let itensExtras = [];

        for (const itemInfo of itens)   
        {
            const [codigo, quantidade] = itemInfo.split(',');
            if (parseInt(quantidade) === 0)
            {
                return "Quantidade inválida!";
            }
            const item = this.cardapio.find(item => item.codigo === codigo);
            if (!item)
            {
                return "Item inválido!";
            }

            if (this.combos.includes(codigo))
            {
                itensPrincipais.push(codigo);
                const extrasDoCombo = [];
                
                const extras = itens.filter(item => item !== itemInfo);
                for (const extraInfo of extras)
                {
                    const [extraCodigo, extraQuantidade] = extraInfo.split(',');

                    const extraItem = this.cardapio.find(item => item.codigo === extraCodigo);
                    if (!extraItem)
                    {
                        return "Item inválido!";
                    }
                    
                    const extraValor = extraItem.valor * parseInt(extraQuantidade);
                    valorTotal += extraValor;
                    extrasDoCombo.push({ codigo: extraCodigo, valor: extraValor });
                    
                }

                itensExtras.push(...extrasDoCombo);

                continue;
                
            }
            

            const valorItem = item.valor * parseInt(quantidade);
            valorTotal += valorItem;
           
            for(const extra of itensExtras)
            {
                const itemPrincipal = extra.codigo.replace('extra','');
                if(!itensPrincipais.includes(itemPrincipal))
                {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }
        if (metodoDePagamento === 'dinheiro')
        {
            valorTotal *= (1 - this.descontoDinheiro);
        } else if (metodoDePagamento === 'credito')
        {
            valorTotal *= (1 + this.acrescimoCredito);
        }
        return `R$ ${valorTotal.toFixed(2)}`;
    }

}

export { CaixaDaLanchonete };
