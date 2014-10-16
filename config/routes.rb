Hackbyrd::Application.routes.draw do
  root :to => 'hackbyrd#home'

  match '/about',     to: 'hackbyrd#about',     via: 'get'
  match '/work',      to: 'hackbyrd#work',      via: 'get'
  match '/projects',  to: 'hackbyrd#projects',  via: 'get'
  match '/press',     to: 'hackbyrd#press',     via: 'get'
  match '/snake',     to: 'hackbyrd#snake',     via: 'get'
  match '/andrea',    to: 'hackbyrd#andrea',    via: 'get'
end
