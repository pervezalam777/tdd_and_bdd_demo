//@ts-nocheck
import { isValidContainer, hasPropertyWithType } from '../../utils/utils.js';

const getTemplate = (username) => {
  return `
  <div class="container">
    <header>
      <nav>
        <span class="user-profile">${username}</span>
        <button id="logout" class="logout-btn">logout</button>
      </nav>
    </header>
    <main>
      <h1>Dashboard</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised in the 1960s with the release of 
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
      publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </main>
  </div>
`
}

class HomeView {

  init(container, opt = {}) {
    if(!isValidContainer(container) || !this._isValidOptionObject(opt)){
      throw new Error("Invalid arguments passed");
    }
    this.container  = container;
    this.username = opt.username;
    this.handleLogout = opt.handleLogout;
    
    return this;
  }

  _isValidOptionObject(options){
    return hasPropertyWithType(options, ['handleLogout'], 'function') 
      && hasPropertyWithType(options, ['username'], 'string');
  }


  render(){
    this.container.innerHTML = getTemplate(this.username);
    this._elLogoutButton = document.getElementById('logout');
    return this;
  }

  assignEvents(){
    this._elLogoutButton.addEventListener('click', this.handleLogout);
  }

  destroy() {
    this._elLogoutButton.removeEventListener('click', this.handleLogout);
    this._elLogoutButton = undefined;
    this.username = undefined;
  }
}

export const HomeViewFactory = {
  create: () => new HomeView()
}