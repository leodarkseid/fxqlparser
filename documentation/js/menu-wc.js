'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fxql documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' :
                                            'id="xs-controllers-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' :
                                        'id="xs-injectables-links-module-AppModule-cbfed0158ec9fc3a8bfc22958c16fa2bcb86511d3e789d4459331b6434a864e8a5c7c24d6682f5fa0104b8d641da6aa4115492af0f93add7bb7435c8a3b989d4"' }>
                                        <li class="link">
                                            <a href="injectables/FXQLService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FXQLService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' :
                                        'id="xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FXQLDto.html" data-type="entity-link" >FXQLDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegexDataValidator.html" data-type="entity-link" >RegexDataValidator</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FXData.html" data-type="entity-link" >FXData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FXQLResponse.html" data-type="entity-link" >FXQLResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FXRate.html" data-type="entity-link" >FXRate</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});