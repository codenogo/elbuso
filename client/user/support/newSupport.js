Template.newSupport.helpers({
	admin: function(){
		var admin =	Meteor.users.find({'roles.__global_roles__':'admin'});
	}
});
Template.newSupport.events({
	'submit .new-conversation-form': function(event, template){
		event.preventDefault();
		var currentUserRole = Meteor.users.findOne({_id: Meteor.userId()}).roles.__global_roles__;
        var topicVar = event.target.newTopic.value;
        var firstMessageVar = event.target.firstMessage.value;
        var currentDate = new Date();
        var author = Meteor.userId();
        var openState = true;
        if (currentUserRole == 'admin'){
        	var target = FlowRouter.getParam('id');
        } else {
        	var target = Meteor.users.findOne({'roles.__global_roles__':'admin'})._id;
        }
        if (topicVar != '') {
        	if (firstMessageVar != '') {
	            Support.insert({
		            topic: topicVar,
		            author: author,
            		createdAt: currentDate,
            		isOpen: openState,
            		participants: [
            			{party: target},
            			{party: author}
            		],
		            message: [
		            	{
		            		message: firstMessageVar,
		            		author: author,
		            		createdAt: currentDate,
		            		read: false
		            	}
		            ]
	            }, function(error){
	            	if (error){
	            		Bert.alert(error.reason, 'danger');
	            		FlowRouter.go('support');
	            	} else {
	            		Bert.alert('your conversation has been created', 'success');
	            		FlowRouter.go('support');
	            	}
	            });
	        } else {
	        	Bert.alert('please add your first message to this conversation', 'danger');
	        }
        } else {
        	Bert.alert('please add a topic to this conversation', 'danger');
        }
	}
});