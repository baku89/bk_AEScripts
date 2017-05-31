// add render queue of active comp to make render
// 
#include "../(bk_include)/util.jsx"

(function main() {

    var queues = getActiveRenderQueues();

    alert(queues);

})();