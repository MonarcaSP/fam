const user = "a";

window.onload = function(){
	sincronizaBaseComStorage();
	// abreImagens('watch');
	abreImagens('novo');	
	document.getElementById("cboGrupos").selectedIndex = 5;	
	// document.body.style.zoom = "90%";
	atualizarDados()
	function pegaEvento(e){		
		if(e.target.classList.contains('selo1')){			
			//let img = e.target.parentElement.parentElement.children[0].children[0];
			let img = e.target.parentElement.parentElement;
			marcaImagemVisto(img);			
			let btn = e.target.dataset.sla;
			btn==0 ? e.target.dataset.sla = '1' : e.target.dataset.sla = '0';
				let added = e.target.parentElement.children[1].dataset.slb;
				if(btn==0 && added==1){
					e.target.parentElement.children[1].dataset.slb = '0';
				}
		}else if(e.target.classList.contains('selo2')){			
			let img = e.target.parentElement.parentElement;
			marcaImagemWatch(img);			
			let btn = e.target.dataset.slb;
			btn==0 ? e.target.dataset.slb = '1' : e.target.dataset.slb = '0';			
		}else if(e.target.classList.contains('selo3')){			
			let img = e.target.parentElement.parentElement;
			marcaImagemLike(img);			
			let btn = e.target.dataset.slc;
			btn==0 ? e.target.dataset.slc = '1' : e.target.dataset.slc = '0';			
		}
	}	
	for(let i=0; i<document.querySelectorAll(".filmes").length; i++){
	document.querySelectorAll(".filmes")[i].addEventListener('click',pegaEvento);	
	}
	document.getElementById("titulo").focus();
	suporteAdicionarGrupoCombo()
}

//Carregamento. Monta objeto de carga e status para buscas e filtros:
class Base{
	constructor(){
		this.acervo = 0;		
		this.filmes = [];
		this.user = 'a';
	}	
	salvar(id, visto, watch, like, visto2, watch2, like2, 
		   chave, titulo, img, grupo, generos, 
		   exibe, print){	
		this.acervo++;
		
		let filme = {};
		filme.id = id;
		filme.visto = visto;
		filme.watch = watch;
		filme.like = like;
		filme.visto2 = visto2;
		filme.watch2 = watch2;
		filme.like2 = like2;
		filme.chave = chave; 
		filme.titulo = titulo;
		filme.img = img;
		filme.grupo = grupo; //usar pra url ou tags
		filme.generos = generos;
		filme.exibe = exibe;
		filme.print = print
		
		this.filmes.push(filme);		
	}	
}

// Cria array de filmes: base.filmes[]
var base = new Base();
// Modelo:
// base.salvar('id', 'visto', 'watch', 'like', 'visto2', 'watch2', 'like2',
// 'chave', 'titulo', 'img', 'grupo', 'generos', 'exibir', 'print');
	// Popula o objeto:
for (let i=0; i<listaImagens.length; i++){
	base.salvar(listaImagens[i][0],		//id
				listaImagens[i][1][2],	//va
				listaImagens[i][1][8],	//wa
				listaImagens[i][1][14], //la
				listaImagens[i][1][5],	//vb
				listaImagens[i][1][11],	//wb
				listaImagens[i][1][17],	//lb
				listaImagens[i][1], 	//chave
				listaImagens[i][2], 	//titulo
				listaImagens[i][3], 	//img
				listaImagens[i][4], 	//grupo (criar tags? ou url)
				listaImagens[i][5],		//generos (usar este combo)
				1,						//exibe
				true)					//print
}

function sincronizaBaseComStorage(){
	//Assumindo que se não tem mafVisto, não tem nenhum para carga.
	if(localStorage.getItem('mafVisto') != null){		
		
		let storVisto = localStorage.getItem('mafVisto');
		let storWatch = localStorage.getItem('mafWatch');
		let storLike = localStorage.getItem('mafLike');
		let storVisto2 = localStorage.getItem('mafVisto2');
		let storWatch2 = localStorage.getItem('mafWatch2');
		let storLike2 = localStorage.getItem('mafLike2');
		
		// Verifica tb undefined
		for (let i=0; i<base.filmes.length; i++){
		try{
		base.filmes[i].visto = storVisto[i]==null ? '0' : storVisto[i];
		base.filmes[i].watch = storWatch[i]==null ? '0' : storWatch[i];
		base.filmes[i].like = storLike[i]==null ? '0' : storLike[i];
		base.filmes[i].visto2 = storVisto2[i]==null ? '0' : storVisto2[i];
		base.filmes[i].watch2 = storWatch2[i]==null ? '0' : storWatch2[i];
		base.filmes[i].like2 = storLike2[i]==null ? '0' : storLike2[i];
		base.filmes[i].chave = montaChave(i)[0]+montaChave(i)[1]+montaChave(i)[2];
		}catch(err){
			//Alguma chave não criada ou deletada.
			// console.log(err.message);
		}
		}
	}else{
		let cargaVisto = "";
		let cargaWatch = "";
		let cargaLike = "";
		let cargaVisto2 = "";
		let cargaWatch2 = "";
		let cargaLike2 = "";
				
		for(let i=0; i<base.filmes.length; i++){
			cargaVisto += base.filmes[i].visto;
			cargaWatch += base.filmes[i].watch;
			cargaLike += base.filmes[i].like;
			cargaVisto2 += base.filmes[i].visto2;
			cargaWatch2 += base.filmes[i].watch2;
			cargaLike2 += base.filmes[i].like2;			
		}
		
		localStorage.setItem("checkFade", 0);	
		
		localStorage.setItem('mafVisto', cargaVisto);
		localStorage.setItem('mafWatch', cargaWatch);
		localStorage.setItem('mafLike', cargaLike);
		localStorage.setItem('mafVisto2', cargaVisto2);
		localStorage.setItem('mafWatch2', cargaWatch2);
		localStorage.setItem('mafLike2', cargaLike2);
	}	
}

function montaChave(id){		
	let chave = [];		
	chave.push("va" + base.filmes[id].visto + "vb" + base.filmes[id].visto2);
	chave.push("wa" + base.filmes[id].watch + "wb" + base.filmes[id].watch2);
	chave.push("la" + base.filmes[id].like  + "lb" + base.filmes[id].like2);	
	return chave;
}

function printImagem(pasta){
	// let guia = "";
	for (var i=0; i<base.filmes.length; i++){		
		if(pasta === 'visto'){
			guia = "Visto";
			if(base.filmes[i].visto == 1){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else if(pasta === 'inedito'){
			guia = "Inédito";
			if(base.filmes[i].visto == 0){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else if(pasta === 'watch'){
			guia = "Watchlist";
			if(base.filmes[i].watch == 1){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else if(pasta === 'like'){
			guia = "Gostei";
			if(base.filmes[i].like == 1){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else if(pasta === 'novo'){
			guia = "Novidades";
			let achou = base.filmes[i].generos.toLowerCase().includes('novo');
			if(achou){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else if(pasta === 'genero'){			
			let comboGenre = document.getElementById("cboGrupos").value;
			comboGenre != '' ? guia = "Gênero: " + comboGenre : guia = "Todos";
			let achou = base.filmes[i].generos.toLowerCase().includes(comboGenre.toLowerCase());
			if(achou){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else if(pasta === 'titulo'){			
			let busca = document.getElementById("titulo").value;
			guia = "Busca: " + busca;
			let achou = base.filmes[i].titulo.toLowerCase().includes(busca.toLowerCase().trim());
			if(achou){
				base.filmes[i].print = true;
			}else{
				base.filmes[i].print = false;
			}
		}else{
			guia = "Todos";
			base.filmes[i].print = true;
		}	
	}
	document.getElementById('guia').textContent = guia;
}

function abreImagens(print){
	// lerWatchlist = localStorage.getItem("lerWatchlist");	
	// localStorage.setItem("guiaAtiva", "Watchlist");	
	// localStorage.removeItem("lastAtivo");
	
	var desbota = localStorage.getItem("checkFade") == 1 ? true : false;
	desbota ? document.getElementById('check').checked = true : document.getElementById('check').checked = false;	
	
	let htm = ""	
	printImagem(print)	
	for (var i=0; i<base.filmes.length; i++){
		if(base.filmes[i].print){ //Imprimi?		
			
			let sts = montaChave(i)[0];
			let wlt = montaChave(i)[1];
			let lke = montaChave(i)[2];
			let alt = base.filmes[i].titulo
			
			// Cria elemento:
			let fade = base.filmes[i].visto == 1 && desbota ? 0.3 : 1;
			
			htm +=	"  <div class='card' " 
				+ 	"  id='" + base.filmes[i].id
				+	"' data-foco='1' data-sts='" + sts
				+	"' data-wlt='" + wlt
				+	"' data-like='" + lke
				+	"' style='opacity: " + fade + ";" 				
				+   "'>"				
				+	"  <div class='moldura'>" 
				+ 	"  <img id='" + base.filmes[i].id				
				+	"' class='pic"
				+	"' alt=' " + alt + "' title='" + alt
				+	"' onclick='abrirGuia(this)"
				+	"' src='" + base.filmes[i].img				
				+ 	"' ></div>"
				+ 	"  <span class='like'></span>"
				+	"  <div class='selos'>"				
				+	"  <div class='selo3' data-slc='" + lke[2] + "' data-sbc='" + lke[5] + "'>Gostei</div>" 
				+	"  <div class='selo2' data-slb='" + wlt[2] + "' data-sbb='" + wlt[5] + "'>Watchlist</div>" 
				+	"  <div class='selo1' data-sla='" + sts[2] + "' data-sba='" + sts[5] + "'>Visto</div>" 
				+ 	"  </div>"
				+ 	"  </div>";
		}
    }
	
	// htm += "<hr>"
	htm += "<p class='footer'>::  Desenvolvido por MSP  ::  nov/2021  ::  versão 3.5  ::</p>"
	let destino = document.getElementById("resultado")	
	destino.innerHTML = htm;	
	// document.body.innerHTML += htm;
	document.getElementById('conta').textContent = contaPrint();
}

// Inverte o flag, entre 1 e 0 ====================================================================
function marcaImagemVisto(id){
	if(base.filmes[id.id].visto == 0 && base.filmes[id.id].watch == 1){
		marcaImagemWatch(id)
	}
	
	let nFlag = "";
	let nChave = "";	
	
	nFlag = inv(base.filmes[id.id].visto);
				base.filmes[id.id].visto = nFlag;
	
	if(nFlag==1){gravaLastAssistido(base.filmes[id.id].titulo)}
	atualizarDados()
	
	nChave = montaChave(id.id)
	id.dataset.sts = nChave[0];
	base.filmes[id.id].chave = nChave[0]+nChave[1]+nChave[2];
	
	var desbota = localStorage.getItem("checkFade") == 1 ? true : false;	
	if(desbota){
		id.style.opacity = nFlag!=1 ? 1 : 0.3;		
	}else{
		id.style.opacity = 1; //não seria necessário.
	}
		
	let nMemo = "";						
	for(let i=0; i<base.filmes.length; i++){
		nMemo += base.filmes[i].visto;			
	}	
	localStorage.setItem('mafVisto', nMemo);
	// localStorage.setItem("lastAtivo", id.id);	
}
	
function marcaImagemWatch(id){
	let nFlag = "";
	let nChave = "";	
	
	nFlag = inv(base.filmes[id.id].watch);
				base.filmes[id.id].watch = nFlag;				
		
	if(nFlag==1){gravaLastAdicionado(base.filmes[id.id].titulo)}
	atualizarDados()
	
	nChave = montaChave(id.id)
	id.dataset.wlt = nChave[1];
	base.filmes[id.id].chave = nChave[0]+nChave[1]+nChave[2];
	// id.style.opacity = nFlag!=1 ? 1 : 0.3;	
		
	let nMemo = "";						
	for(let i=0; i<base.filmes.length; i++){
		nMemo += base.filmes[i].watch;			
	}	
	localStorage.setItem('mafWatch', nMemo);
	// localStorage.setItem("lastAtivo", id.id);
}

function marcaImagemLike(id){
	let nFlag = "";
	let nChave = "";	
	
	nFlag = inv(base.filmes[id.id].like);
				base.filmes[id.id].like = nFlag;				
	
	nChave = montaChave(id.id)
	id.dataset.like = nChave[2];
	base.filmes[id.id].chave = nChave[0]+nChave[1]+nChave[2];
	// id.style.opacity = nFlag!=1 ? 1 : 0.3;	
		
	let nMemo = "";						
	for(let i=0; i<base.filmes.length; i++){
		nMemo += base.filmes[i].like;			
	}	
	localStorage.setItem('mafLike', nMemo);
	// localStorage.setItem("lastAtivo", id.id);
}

function inv(flag){
	if(flag==1){
		return 0;
	}else if(flag==0){
		return 1;
	}else{
		return 0; //Prevendo novas entradas manuais, onde ficará undefined.
	}	
}

// Informações Estatísticas ======================================================================================

function atualizarDados(){
	let total = base.acervo;
	let vistos = base.filmes.reduce((soma, atual) => soma + parseInt(atual.visto), 0);
	let adicionados = base.filmes.reduce((soma, atual) => soma + parseInt(atual.watch), 0)
	let assistiu = localStorage.getItem("lastAssistido");
	let adcionou = localStorage.getItem("lastAdicionado");
	
	document.getElementById('resTotal').textContent = total;
	document.getElementById('resVisto').textContent = vistos + " (" + (vistos/total*100).toFixed(0)+"%)";
	document.getElementById('resWatch').textContent = adicionados + " (" + (adicionados/total*100).toFixed(0)+"%)";
	
	document.getElementById('resViu').textContent = assistiu;
	document.getElementById('resAdd').textContent = adcionou;
}
function gravaLastAssistido(title){
	localStorage.setItem("lastAssistido", title);
}
function gravaLastAdicionado(title){
	localStorage.setItem("lastAdicionado", title);
}

// function lastAtivo(){
	// // Com a nova lógica de card acho que naum tera mais uso
	// let sel = localStorage.getItem("lastAtivo");	
	
	// for (var i=0; i<base.filmes.length; i++){
		// if(i == sel){
			// return base.filmes[i].titulo
			// break;
		// }
	// }	
// }

//Seleção de Filtros: Olhando o DOM ==============================================================================

function alterarCheckFade(){
	fecharFiltros();
	// fecharTools();
	let check = document.getElementById('check').checked ? 1 : 0;
	localStorage.setItem("checkFade", check);
	alert("Visão será padrão na próxima consulta.");
}

function abreTodos(){
	fecharFiltros()
	// localStorage.setItem("guiaAtiva", "Todos");	
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){
		imagem[i].dataset.foco='1';
		// imagem[i].opacity = fade;		
	}
	document.getElementById('filtro').textContent = "nenhum";
	document.getElementById('conta').textContent = contaPrint();
	topoPagina();
}
	//Filtro Assistidos / Vistos == Olhando para o DOM
function abreVisto(ck){
	fecharFiltros()
	// localStorage.setItem("guiaAtiva", "Vistos");	
	// let n = 0
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){		
		if(imagem[i].dataset.sts[2] == ck){
			imagem[i].dataset.foco='1';
			// n++
		}else{
			imagem[i].dataset.foco='0';
		}
	}
	document.getElementById('filtro').textContent = ck==1 ? "visto" : "inédito";
	document.getElementById('conta').textContent = contaPrint();
	topoPagina();
}
	//Filtro Inéditos
function abreDesmarcado(){
	fecharFiltros()
	// localStorage.setItem("guiaAtiva", "Inéditos");	
	// let n = 0
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){		
		if(imagem[i].dataset.sts[2] == 0 && imagem[i].dataset.wlt[2] == 0){
			imagem[i].dataset.foco='1';
			// n++
		}else{
			imagem[i].dataset.foco='0';
		}
	}
	document.getElementById('filtro').textContent = "inéditoNoAdded";
	document.getElementById('conta').textContent = contaPrint();
	topoPagina();	
}
	//Filtro Watchlist
function abreWatchlist(ck){
	fecharFiltros()
	// localStorage.setItem("guiaAtiva", "Watchlist");		
	// let n = 0
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){		
		if(imagem[i].dataset.wlt[2] == ck){		
			imagem[i].dataset.foco='1';
			// n++
		}else{
			imagem[i].dataset.foco='0';
		}
	}
	document.getElementById('filtro').textContent = ck==1 ? "watchlist" : "NoAdded";
	document.getElementById('conta').textContent = contaPrint();
	topoPagina();
}
	//Filtro Gostei
function abreGostei(){
	fecharFiltros()
	// localStorage.setItem("guiaAtiva", "Gostei");	
	// let n = 0
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){		
		if(imagem[i].dataset.like[2] == 1){
			imagem[i].dataset.foco='1';
			// n++
		}else{
			imagem[i].dataset.foco='0';
		}
	}
	document.getElementById('filtro').textContent = "gostei";
	document.getElementById('conta').textContent = contaPrint();
	topoPagina();
}

//Seleção de Cross Filtros: ==============================================================================
	// Por enquanto tá com chave geral. 
// function abreCrossAdicionou(){
	// fecharFiltros()
	// // localStorage.setItem("guiaAtiva", "Cross");		
	// // let n = 0
	// let imagem = document.querySelectorAll(".card");
	// for(let i=0;i<imagem.length;i++){		
		// if(imagem[i].dataset.wlt[5] == 1){		
			// imagem[i].dataset.foco='1';
			// // n++
		// }else{
			// imagem[i].dataset.foco='0';
		// }
	// }
	// document.getElementById('filtro').textContent = "cross";
	// document.getElementById('conta').textContent = contaPrint();	
// }

//Auxiliares: =====================================================================================
	//Montar Div Modal
function listaSelecao(){
	// fecharFiltros();
	fecharTools();
	let imagem = document.querySelectorAll(".card");
	let temp = "";
	 // location.reload();
	var saida = "<main class='saida' style='background-color: #F3F0D7;'>"
			  + "<button onclick='location.reload()'><<< Voltar</button><br><br>" 
			  + "<b>Listagem<br>";
	// saida += localStorage.getItem("guiaAtiva") + ":<br>";	
	saida += "Pasta: " + document.getElementById('guia').textContent + ", filtro: " + document.getElementById('filtro').textContent + ":<br>";
	saida += "</b><br>";
		for(let i=0;i<imagem.length;i++){
			// console.log(imagem[i].dataset.sts)
			if(imagem[i].dataset.foco === '1'){
				// temp = imagem[i].dataset.sts + imagem[i].dataset.wlt + imagem[i].dataset.like
				// saida += temp + "|" + imagem[i].id + "|" + imagem[i].children[0].children[0].title + "<br>";
				saida += imagem[i].children[0].children[0].title + "<br>";
			}
		}
	saida += "<br>" 
			  + "<button onclick='location.reload()'><<< Voltar</button></main><br><br>";
	saida = saida.replaceAll("undefined","0")
	// document.write(saida);
	document.body.innerHTML = saida;
}

function resetarMarcadas2(){
	// fecharFiltros();
	fecharTools();
	if(confirm("Limpar todas alteração, restaurando a marcação inicial?")){
		// localStorage.clear();
		localStorage.removeItem('mafVisto');
		localStorage.removeItem('mafWatch');
		localStorage.removeItem('mafLike');
		localStorage.removeItem('mafVisto2');
		localStorage.removeItem('mafWatch2');
		localStorage.removeItem('mafLike2');	
		abreImagens();
	}
	fecharFiltros()
	location.reload()
}

function resetarMarcadas(){
	// fecharFiltros();
	fecharTools();	
	if(confirm("Limpar todas marcações?")){
		let cargaVisto = "";
		let cargaWatch = "";
		let cargaLike = "";
		let cargaVisto2 = "";
		let cargaWatch2 = "";
		let cargaLike2 = "";
				
		for(let i=0; i<base.filmes.length; i++){
			cargaVisto += "0";
			cargaWatch += "0";
			cargaLike += "0";
			cargaVisto2 += "0";
			cargaWatch2 += "0";
			cargaLike2 += "0";		
		}		
				
		localStorage.setItem('mafVisto', cargaVisto);
		localStorage.setItem('mafWatch', cargaWatch);
		localStorage.setItem('mafLike', cargaLike);
		localStorage.setItem('mafVisto2', cargaVisto2);
		localStorage.setItem('mafWatch2', cargaWatch2);
		localStorage.setItem('mafLike2', cargaLike2);
	}	
	fecharFiltros()
	location.reload()
}

function abrirGuia(imagem){
	fecharFiltros();
	fecharTools();	
	// let sel = lastAtivo()	
	let sel = base.filmes[imagem.id].grupo
	if(typeof sel != 'undefined'){
		// if(confirm("Confirma pesquisa imdb para " + sel +"?")){
			if(typeof sel != 'undefined'){
			// var URL="https://www.imdb.com/find?s=tt&q=" + sel;
			//"https://www.justwatch.com/br/busca?sort_by=release_year&q="
			// var URL="https://letterboxd.com/search/" + sel;			
			window.open(sel, '_blank')
			}
		// }
	}else{
		alert("Nenhum item foi clicado ou os pop-ups estão bloqueados.");
	}
	fecharFiltros()
}

//Consultas / Filtros: ============================================================================

function topoPagina(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	document.getElementById("titulo").focus();
}
 
	// Combobox:
function buscaGrupo(){
	var comboGrupos = document.getElementById("cboGrupos");	
	buscaGenreCombo(comboGrupos.value);	
	// comboGrupos.selectedIndex = 0;
}

function suporteAdicionarGrupoCombo(){
	var comboGrupos = document.getElementById("cboGrupos");
	// const categorias = ['Ação/Aventura','Animação','Comédia','Curtas','Destaques','Documentário','Drama','Infantis,Ultra HD e HDR','Novidades','Todos os filmes'];
    
	listaGrupos.forEach((item) =>{
		// console.log("<option value='" + item + "'>" + item + "</option>");
		var opt = document.createElement("option");
		opt.value = item;
		opt.text = item;
		comboGrupos.add(opt, comboGrupos.options[opt.length]);
	});
}
function suporteAdicionarCombo(idCombo, id, item){
	let comboGrupo = document.getElementById(idCombo);		
	let opt = document.createElement("option");
	opt.value = id;
	opt.text = item;
	comboGrupo.add(opt, comboGrupo.options[opt.length]);
}
// cboGrupos.selectedIndex = 0 | remove | add
// Seleção Aleatória: cboGrupos.selectedIndex = Math.floor(Math.random() * comboCidades.length);

function buscaGenreCombo(genre){	
	// document.getElementById('guia').textContent = "Busca Gênero " + genre;	
	if(genre==='watch' || genre==='visto' || genre==='inedito' || genre==='like'){
		abreImagens(genre);
	}else{
		abreImagens('genero');
	}
	document.getElementById('filtro').textContent = "nenhum";
	// document.getElementById('guia').textContent = contaPrint();
	topoPagina();
}

function buscaTitulo(){	
	var txtTitulo = document.getElementById("titulo");	
	let titulo = txtTitulo.value;
	
	abreImagens('titulo');
	
	txtTitulo.value = "";
	txtTitulo.focus();
	// let n = 0;
	document.getElementById("cboGrupos").selectedIndex = 0;
	document.getElementById('filtro').textContent = "nenhum";
	// document.getElementById('guia').textContent = contaPrint();
}

function checkEnter(){
	if (event.keyCode == 13){
		buscaTitulo();
	}
}

	//busca nos impressos, mas não disponibilizado.
function buscaGenre2(){
	fecharFiltros()
	let genre = prompt("Digite o gênero")
	document.getElementById('guia').textContent = "Busca Gênero " + genre;	
	let n = 0
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){
		let achou = base.filmes[imagem[i].id].generos.toLowerCase().includes(genre.toLowerCase().trim());
		if(achou){
			imagem[i].dataset.foco='1';
			n++
		}else{
			imagem[i].dataset.foco='0';
		}
	}	
	document.getElementById('guia').textContent = "Busca Título: " + genre + ", achou " + n + ".";	
}

	//busca nos impressos, mas não disponibilizado.
function buscaTitulo2(){
	fecharFiltros()
	let titulo = prompt("Digite o título ou parte dele.")	
	let n = 0
	let imagem = document.querySelectorAll(".card");
	for(let i=0;i<imagem.length;i++){
		let achou = base.filmes[imagem[i].id].titulo.toLowerCase().includes(titulo.toLowerCase().trim());
		if(achou){
			imagem[i].dataset.foco='1';
			n++
		}else{
			imagem[i].dataset.foco='0';
		}
	}	
	document.getElementById('guia').textContent = "Busca Título: " + titulo + ", achou " + n + ".";		
}

function buscaChave(){
	fecharFiltros();
	fecharTools();
	let chave = prompt("Digite a chave para filtrar atividades do amigo:\n"
					+  "vb1: Amigo viu.\nwb1: Amigo adicionou.\nlb1: Amigo gostou.\n"
					+  "Substitua 1 por 0 para o contrário.\n\n"
					+  "Recurso mais amigável em futuras versões.");
	let n = 0
	let imagem = document.querySelectorAll(".card");
	if(chave != null){		
		for(let i=0;i<imagem.length;i++){			
				let achou = base.filmes[imagem[i].id].chave.toLowerCase().includes(chave.toLowerCase().trim());		
				if(achou){					
					imagem[i].dataset.foco='1';
					// n++
				}else{
					imagem[i].dataset.foco='0';					
				}
		}
	document.getElementById('filtro').textContent = "cross " + chave;
	document.getElementById('conta').textContent = contaPrint();
	}	
}

function abreFiltros(){
	document.getElementById('frmTools').style.display = 'none';
	document.getElementById('frmFiltros').style.display = 'block';
	// document.getElementById('btnTools').disabled = true;
}
function fecharFiltros(){
	document.getElementById('frmFiltros').style.display = 'none';	
}
function abreTools(){	
	document.getElementById('frmFiltros').style.display = 'none';
	document.getElementById('frmTools').style.display = 'block';	
}
function fecharTools(){	
	document.getElementById('frmTools').style.display = 'none';	
}

function contaPrint(){	
	let n = 0;
	let visto = 0;
	let completo = "0%"
	let imagem = document.querySelectorAll(".card");
	// n = imagem.length;
	for(let i=0;i<imagem.length;i++){		
		if(imagem[i].dataset.foco == 1){
			n++;
			visto += imagem[i].dataset.sts[2] == 1 ? 1 : 0;
		// visto += base.filmes[imagem[i].id].visto == 1 ? 1 : 0;
		}
	}
	completo = (visto/n*100).toFixed(0)+"%";
	
	return ": viu " + visto + " de " + n + " (" + completo + ")";	
}

function contaGeneros(){
	fecharTools();
	
	let saida = "<main class='saida' style='background-color: #F3F0D7;'>" 
			  + "<button onclick='location.reload()'><<< Voltar</button><br><br>" 
			  + "<b>Estatísticas:</b><br><br>";
	
	// Funciona no console:
	// base.filmes.map(item => item.grupo).filter((value, index, self) => self.indexOf(value) === index);
	const grupos = listaGrupos;
	// let saida = "Estatísticas:\n"
	let g = 0;
	
	for(let j=0;j<grupos.length;j++){
		let t = 0;
		let v = 0;	
		for(let i=0;i<base.acervo;i++){
			let achou = base.filmes[i].generos.toLowerCase().includes(grupos[j].toLowerCase());
			if(achou){
				if(base.filmes[i].visto == 1){
					v++;
					t++;
					g++
				}else{
					t++;
					g++
				}		
			}		
		}	
		completo = (v/t*100).toFixed(0)+"%";	
		saida += grupos[j] + ": viu " + v + " de " + t + " (" + completo + "), restando " + (t-v) + ".\n<br>";
		saida += "<div class='barra'><div class='status' style='width: " + completo + ";'></div></div><br>";
	}
	
	let vistos = base.filmes.reduce((soma, atual) => soma + parseInt(atual.visto), 0);
	completo = (vistos/base.acervo*100).toFixed(0)+"%";
	saida += "\nTodos os filmes" + ": viu " + vistos + " de " + base.acervo + " (" + completo + "), restando " + (base.acervo-vistos) + ".\n";
	saida += "<div class='barra'><div class='status' style='width: " + completo + ";'></div></div><br>";
	// alert(saida);
	// console.log(saida);
	
	saida += "<br>" 
			  + "<button onclick='location.reload()'><<< Voltar</button></main><br><br>";
	htm = saida
	// htm += "<p class='footer'>::  Desenvolvido por Monarca  ::  nov/2021  ::  versão 3.5  ::</p>"
	// let destino = document.getElementById("resultado")	
	// destino.innerHTML = htm;	
	document.body.innerHTML = htm;	
}
				
//=================================================================================================

function abreBackup(){
	fecharTools();
	let url="./backup.html";
	window.open(url, '_blank')
}

function irContato(){
	fecharTools();
	let url="https://movieasianfansub.forumeiros.com/privmsg?mode=post&u=45115";
	window.open(url, '_blank')
}

function msgAjuda(){
	// fecharFiltros();
	fecharTools();
	alert("faM Base nov/2021\n"
		+ "Inicie as marcações de Visto, adição na Watchlist escolhendo uma pasta.\n"
		+ "Se desejado pode ainda filtrar os títulos exibidos com o botão Filtros.\n"
		+ "Exemplpo Pasta China, filtrando Inéditos.\n"
		+ "Sempre que escolher outra pasta o filtro será removido.\n"
		+ "Use busca para trazer coleções, como por exemplo pesquisar por continuações.\n"		
		+ "Infelizmente pode existir alguma diferença do nome interno com a imagem.\n"		
		+ "Se desejar que os títulos vistos sejam desbotados, marque fade em Filtros\n"		
		+ "A fina tarja colorida abaixo das marcações indicam comparação com outro perfil.\n"		
		+ ".::MSP::.\n");
}

function msgSobre(){	
	fecharTools();
	alert("Aplicação desenvolvida para uso pessoal, com a finalidade de explorar o fórum "
		+ "da maf. Não tenho nenhuma responsabilidade pelo conteúdo ou incentivo de qualquer tipo. "
		+ "Conteúdo pode não refletir 100% com o serviço por atualizações constantes.\n\nMSP.");	
}

