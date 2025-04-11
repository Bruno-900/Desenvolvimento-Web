document.addEventListener('DOMContentLoaded', function() { // Executa o código quando o DOM estiver completamente carregado
    // Smooth scroll para navegação
    document.querySelectorAll('nav a').forEach(anchor => { // Seleciona todos os links dentro da navegação e itera sobre cada um deles
        anchor.addEventListener('click', function(e) { // Adiciona um ouvinte de evento de clique para cada link
            e.preventDefault(); // Previna o comportamento padrão do link (navegação imediata)
            const targetId = this.getAttribute('href'); // Obtém o valor do atributo href do link, que indica o id da seção destino
            const section = document.querySelector(targetId); // Seleciona a seção do documento que corresponde ao id obtido
            if (section) { // Verifica se a seção existe
                section.scrollIntoView({ // Realiza o scroll suave para a seção
                    behavior: 'smooth', // Define o scroll com comportamento suave
                    block: 'start' // Alinha a seção ao início da área visível
                });
            }
        });
    });

    // Galeria de imagens interativa
    document.querySelectorAll('img').forEach(img => { // Seleciona todas as imagens da página e itera sobre cada uma
        img.addEventListener('click', function() { // Adiciona um ouvinte de evento de clique em cada imagem
            const modal = document.createElement('div'); // Cria um novo elemento <div> para servir como modal
            modal.className = 'modal'; // Define a classe do modal como 'modal'
            
            const modalContent = document.createElement('div'); // Cria um novo elemento <div> para o conteúdo interno do modal
            modalContent.className = 'modal-content'; // Define a classe do conteúdo do modal como 'modal-content'
            
            const modalImg = new Image(); // Cria um novo elemento de imagem para exibir a imagem em tamanho maior
            modalImg.src = this.src; // Define a fonte da imagem do modal igual à da imagem clicada
            modalImg.alt = this.alt; // Define o texto alternativo da imagem do modal igual ao da imagem clicada
            modalImg.className = 'modal-image'; // Atribui a classe 'modal-image' à imagem do modal
            
            const caption = document.createElement('p'); // Cria um elemento <p> para servir de legenda no modal
            caption.className = 'modal-caption'; // Define a classe da legenda como 'modal-caption'
            caption.textContent = this.alt; // Define o texto da legenda como o atributo alt da imagem clicada

            modalContent.appendChild(modalImg); // Adiciona a imagem modal ao conteúdo do modal
            modalContent.appendChild(caption); // Adiciona a legenda ao conteúdo do modal
            modal.appendChild(modalContent); // Adiciona o conteúdo modal à div modal
            document.body.appendChild(modal); // Insere o modal no início do corpo do documento

            modal.addEventListener('click', (e) => { // Adiciona um ouvinte de clique ao modal para fechá-lo
                if (e.target === modal) { // Verifica se o clique ocorreu fora do conteúdo modal (no fundo do modal)
                    modal.remove(); // Remove o modal do DOM se o clique for fora do conteúdo
                }
            });
        });
    });

    // Progresso de leitura
    const progressBar = document.createElement('div'); // Cria um novo elemento <div> para servir como barra de progresso
    progressBar.className = 'progress-bar'; // Define a classe da barra de progresso como 'progress-bar'
    document.body.prepend(progressBar); // Insere a barra de progresso no início do body

    const updateProgress = () => { // Define uma função para atualizar a largura da barra de progresso conforme a rolagem
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight; // Calcula a altura total rolável da página
        const scrolled = (window.scrollY / windowHeight) * 100; // Calcula a porcentagem de rolagem atual
        progressBar.style.width = `${Math.min(scrolled, 100)}%`; // Define a largura da barra com base na porcentagem, limitando a 100%
    };
    window.addEventListener('scroll', updateProgress); // Adiciona um ouvinte de evento para atualizar a barra de progresso a cada rolagem
    updateProgress(); // Atualiza a barra de progresso inicialmente

    // Highlight de seções
    const sections = document.querySelectorAll('section'); // Seleciona todas as seções da página
    const navLinks = document.querySelectorAll('nav a'); // Seleciona todos os links dentro da navegação

    const updateActiveSection = () => { // Define uma função para atualizar qual seção está ativa de acordo com a rolagem
        let current = ''; // Inicializa a variável que armazenará o id da seção atual
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Calcula a posição atual da rolagem considerando a metade da altura da janela

        sections.forEach(section => { // Itera sobre cada seção para determinar a seção visível atualmente
            const sectionTop = section.offsetTop; // Obtém a distância do topo da seção
            const sectionBottom = sectionTop + section.offsetHeight; // Calcula a distância da parte inferior da seção

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) { // Verifica se a posição de rolagem está dentro desta seção
                current = section.id; // Define a seção atual pelo seu id
            }
        });

        navLinks.forEach(link => { // Itera sobre cada link de navegação
            link.classList.toggle('active', link.hash === `#${current}`); // Ativa ou desativa a classe 'active' dependendo se o link corresponde à seção atual
        });
    };
    window.addEventListener('scroll', updateActiveSection); // Adiciona um ouvinte para atualizar a seção ativa a cada rolagem
    updateActiveSection(); // Atualiza a seção ativa inicialmente

    // Sistema de tema
    const themeButton = document.createElement('button'); // Cria um novo elemento <button> para a troca de tema
    themeButton.className = 'theme-toggle'; // Define a classe do botão como 'theme-toggle'
    themeButton.innerHTML = '🌓 Tema'; // Define o conteúdo HTML do botão, exibindo um ícone e texto para o tema
    document.body.appendChild(themeButton); // Adiciona o botão de tema ao final do body

    const applyTheme = (isDark) => { // Define uma função que aplica o tema com base no parâmetro isDark
        document.body.classList.toggle('dark-theme', isDark); // Alterna a classe 'dark-theme' no body dependendo do valor de isDark
        themeButton.innerHTML = isDark ? '☀️ Claro' : '🌙 Escuro'; // Atualiza o texto do botão para indicar o tema ativo
        localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Salva a preferência de tema no armazenamento local
    };

    themeButton.addEventListener('click', () => { // Adiciona um ouvinte de clique ao botão de tema
        const isDark = !document.body.classList.contains('dark-theme'); // Determina o estado oposto do tema atual
        applyTheme(isDark); // Aplica o novo tema com base no estado invertido
    });

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme'); // Recupera a preferência de tema salva no armazenamento local
    applyTheme(savedTheme === 'dark'); // Aplica o tema salvo, definindo como dark se o valor salvo for 'dark'

    // Botão de voltar ao topo
    const scrollButton = document.createElement('button'); // Cria um novo elemento <button> para voltar ao topo da página
    scrollButton.className = 'scroll-top'; // Define a classe do botão como 'scroll-top'
    scrollButton.innerHTML = '↑'; // Define o conteúdo HTML do botão como uma seta para cima
    document.body.appendChild(scrollButton); // Adiciona o botão de voltar ao topo ao body

    const toggleScrollButton = () => { // Define uma função para alternar a visibilidade do botão de voltar ao topo conforme a rolagem
        const showButton = window.scrollY > 500; // Verifica se a rolagem ultrapassou 500 pixels para exibir o botão
        scrollButton.classList.toggle('show', showButton); // Adiciona ou remove a classe 'show' ao botão baseado na condição
        scrollButton.style.pointerEvents = showButton ? 'auto' : 'none'; // Habilita ou desabilita interações com o botão baseando-se na visibilidade
    };
    window.addEventListener('scroll', toggleScrollButton); // Adiciona um ouvinte de rolagem para ajustar a visibilidade do botão
    toggleScrollButton(); // Define o estado inicial do botão com base na rolagem atual

    scrollButton.addEventListener('click', () => { // Adiciona um ouvinte de clique no botão de voltar ao topo
        window.scrollTo({ // Realiza a rolagem suave até o topo da página
            top: 0, // Define a posição de destino como o topo
            behavior: 'smooth' // Configura a animação de rolagem como suave
        });
    });
}); // Fim do código executado quando o DOM é completamente carregado
