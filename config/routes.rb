Hackbyrd::Application.routes.draw do
  root :to => 'hackbyrd#home'

  match '/timeline', to: 'hackbyrd#timeline', via: 'get'
end
