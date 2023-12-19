//dpack ke under apack, bpack, cpack folder banana hai. file location given below

//dpack/apack/A.java
package apack;

public class A {
    protected int protectedVar = 10;
    private int privateVar = 20;
    public int publicVar = 30;
    protected int getProtectedVar() 
    {
        return protectedVar;
    }

}

//dpack/bpack/B.java
package bpack;
import apack.A;

public class B extends A {
    public void display() {
        System.out.println("Class B - Accessing variables of class A:");
        System.out.println("Protected Variable: " + protectedVar);
        System.out.println("Public Variable: " + publicVar);
    }
}

//dpack/cpack/C.java
package cpack;
import apack.A;

public class C extends A 
{
    public void display() 
    {
        System.out.println("Class C - Accessing variables of class A:");
        System.out.println("Protected Variable: " + getProtectedVar());
        System.out.println("Public Variable: " + publicVar);
    }
}


//dpack/ProtectedDemo.java
package dpack;
import bpack.B;
import cpack.C;

public class ProtectedDemo 
{
    public static void main(String[] args) 
	{
        B objB = new B();
        objB.display();

        C objC = new C();
        objC.display();
    }
}


/*
D:\java\dpack>  javac .\apack\A.java
D:\java\dpack>  javac .\bpack\B.java
D:\java\dpack>  javac .\cpack\C.java
D:\java\dpack>  java ProtectedDemo.java

Class B - Accessing variables of class A:
Protected Variable: 10
Public Variable: 30
Class C - Accessing variables of class A:
Protected Variable: 10
Public Variable: 30
 */