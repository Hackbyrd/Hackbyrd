Hackbyrd::Application.routes.draw do
  root :to => 'hackbyrd#home'
  match '/menu', to: 'hackbyrd#menu', via: 'get'
end
