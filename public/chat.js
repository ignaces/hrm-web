let ws = null

$(function () {
  if (window.username) {
    startChat()
  }
})
function subscribeToChannel () {
    const chat = ws.subscribe('chat')
  
    chat.on('error', () => {
      $('.connection-status').removeClass('connected')
    })
  
    chat.on('message', (message) => {
      swal(
        ' Notificación ',
        message.body,
        'info'
      );  
      
    })
  }
function startChat () {
  ws = adonis.Ws().connect()

  ws.on('open', () => {
    $('.connection-status').addClass('connected')
    subscribeToChannel()
  })

  ws.on('error', () => {
    $('.connection-status').removeClass('connected')
  })

  
}
$('#message').keyup(function (e) {
    if (e.which === 13) {
      e.preventDefault()
  
      const message = $(this).val()
      $(this).val('')
  
      ws.getSubscription('chat').emit('message', {
        username: window.username,
        body: message
      })
      return
    }
  })

