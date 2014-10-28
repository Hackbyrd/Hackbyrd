Hackbyrd::Application.routes.draw do
  root :to => 'hackbyrd#home'

  match '/about',       to: 'hackbyrd#about',       via: 'get'
  match '/fiscalnote',  to: 'hackbyrd#fiscalnote',  via: 'get'
  match '/portfolio',   to: 'hackbyrd#portfolio',   via: 'get'
  match '/contact',     to: 'hackbyrd#contact',     via: 'get'
  match '/snake',       to: 'hackbyrd#snake',       via: 'get'
  match '/andrea',      to: 'hackbyrd#andrea',      via: 'get'
end
