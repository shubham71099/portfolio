/*23.   Write a program that creates and executes at least 2 threads. Each of the threads is trying to deposit and withdraw money from the same Account object (Refer Program 9 above). The threads should be synchronized such that the deposit and withdraw operations should not be performed at the same time.*/

class Account 
{
    	private double balance;

    	public Account(double initialBalance) 
        {
     	    this.balance = initialBalance;
    	}

    	public synchronized void deposit(double amount) 
        {
            balance = balance + amount;
            System.out.println(Thread.currentThread().getName() + " deposited: Rs. " + amount);
                System.out.println("Updated Balance: Rs. " + balance);
    	}

    	public synchronized void withdraw(double amount) 
        {
                if (balance >= amount) 
        {
                            balance = balance - amount;
                        System.out.println(Thread.currentThread().getName() + " withdrew: Rs. " + amount);
                        System.out.println("Updated Balance: Rs. " + balance);
                    } 
        else 
        {
                        System.out.println(Thread.currentThread().getName() + " : Insufficient funds..");
                    }
                }
        }

class TransactionThread extends Thread 
{
       private Account account;
       private boolean isDeposit;
       private double amount;

       public TransactionThread(Account account, boolean isDeposit, double amount) 
        {
                    this.account = account;
                    this.isDeposit = isDeposit;
                this.amount = amount;
                }

        public void run() 
        {
                    if (isDeposit) 
        {
                            account.deposit(amount);
                    } else 
        {
                            account.withdraw(amount);
                    }
                }
        }

class ThreadQue22
{
   	 public static void main(String[] args) 
{
        	Account sharedAccount = new Account(1000.0);

TransactionThread depositThread = new TransactionThread(sharedAccount, true, 500.0);
        	TransactionThread withdrawThread = new TransactionThread(sharedAccount, false, 200.0);

depositThread.start();
        	withdrawThread.start();
    	}
}


Output : 

D:\java> javac ThreadQue23.java
D:\java> java ThreadQue23
Thread-0 deposited: Rs. 500.0
Updated Balance: Rs. 1500.0
Thread-1 withdrew: Rs. 200.0
Updated Balance: Rs. 1300.0
 

/*
24.   Write a Java program to create a Frame which includes Student name, Student Marks, Out of Marks. Create a button to calculate percentage. Clicking the button should display the percentage in another Percentage textfield which is disabled. User should not be able to enter characters in the Marks textfield. Use KeyListener to check. */

import javax.swing.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

class StudentPercentageCalculator extends JFrame 
{
    		private JTextField nameTextField;
    		private JTextField marksTextField;
   		private JTextField outOfMarksTextField;
    		private JTextField percentageTextField;

    		public StudentPercentageCalculator() 
{
        		setTitle("Percentage Calculator");
        		setSize(400, 200);
        		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        		setLayout(null);

                		JLabel nameLabel = new JLabel("Student Name:");
        		nameLabel.setBounds(20, 20, 100, 20);

        		nameTextField = new JTextField();
        		nameTextField.setBounds(130, 20, 200, 20);

        		JLabel marksLabel = new JLabel("Student Marks:");
        		marksLabel.setBounds(20, 50, 100, 20);

        		marksTextField = new JTextField();
        		marksTextField.setBounds(130, 50, 100, 20);
        		marksTextField.addKeyListener(new KeyListener() 
{
                        		public void keyTyped(KeyEvent e) 
{
                				char c = e.getKeyChar();
                				if (!Character.isDigit(c)) 
{
                    				e.consume();
                				}
            			}
            			public void keyPressed(KeyEvent e) 
{

            			}
           			public void keyReleased(KeyEvent e) 
{
            			}
        		});

        	JLabel outOfMarksLabel = new JLabel("Out of Marks:");
        	outOfMarksLabel.setBounds(20, 80, 100, 20);

       	 outOfMarksTextField = new JTextField();
       	 outOfMarksTextField.setBounds(130, 80, 100, 20);

       	 JButton calculateButton = new JButton("Calculate Percentage");
        	calculateButton.setBounds(20, 110, 200, 30);
        	calculateButton.addActionListener(e -> calculatePercentage());

        	JLabel percentageLabel = new JLabel("Percentage:");
        	percentageLabel.setBounds(230, 110, 100, 30);

        	percentageTextField = new JTextField();
        	percentageTextField.setBounds(300, 110, 80, 30);
        	percentageTextField.setEditable(false);

        	add(nameLabel);
        	add(nameTextField);
        	add(marksLabel);
        	add(marksTextField);
        	add(outOfMarksLabel);
        	add(outOfMarksTextField);
        	add(calculateButton);
        	add(percentageLabel);
        	add(percentageTextField);
    }

    private void calculatePercentage() 
{
        	try {
            		double marks = Double.parseDouble(marksTextField.getText());
            		double outOfMarks = Double.parseDouble(outOfMarksTextField.getText());

            		double percentage = (marks / outOfMarks) * 100;
            		percentageTextField.setText(String.format("%.2f%%", percentage));
        	} 
catch (NumberFormatException ex) 
{
            	          JOptionPane.showMessageDialog(this, "Invalid input. Please enter numeric values..");
        	}
    }



    	  public static void main(String[] args) 
  {
        	SwingUtilities.invokeLater(() -> {
            		StudentPercentageCalculator calculator = new StudentPercentageCalculator();
            		calculator.setVisible(true);
        	});
      }
}


