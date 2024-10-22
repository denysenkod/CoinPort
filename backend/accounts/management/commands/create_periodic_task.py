# Import BaseCommand from Django to create custom management commands.
from django.core.management.base import BaseCommand 
# Import models from django_celery_beat for scheduling tasks.
from django_celery_beat.models import PeriodicTask, IntervalSchedule

# Define a new command class that inherits from BaseCommand.
class Command(BaseCommand):
    '''Creates a periodic task to save portfolio values every hour'''

    # The handle method contains the logic executed by the command.
    def handle(self, *args, **kwargs):
        # Create an interval schedule for every 1 hour.
        schedule, created = IntervalSchedule.objects.get_or_create(
            every=1, # Set the interval to every 1 unit of time.
            period=IntervalSchedule.HOURS, # Define the unit of time as hours.
        )

        # Create a periodic task with the defined interval schedule.
        PeriodicTask.objects.get_or_create(
            interval=schedule, # Assign the interval schedule to the task.
            name='Save Portfolio Values Every 1 Hour', # Name of the task for identification.
            task='CoinPort.tasks.save_portfolio_values', # The task to execute, specified by its import path.
        )
        
        # Print a success message to the console once the task is successfully created.
        self.stdout.write(self.style.SUCCESS('Successfully created periodic task'))



        