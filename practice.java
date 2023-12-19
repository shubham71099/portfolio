//apack/A.java
package apack;

public class A {
    protected int protectedVar = 10;
    private int privateVar = 20;
    public int publicVar = 30;
}

//bpack/B.java
package bpack;
import apack.A;

public class B extends A {
    public void display() {
        System.out.println("Class B - Accessing variables of class A:");
        System.out.println("Protected Variable: " + protectedVar);
        System.out.println("Public Variable: " + publicVar);
    }
}

//cpack/C.java
package cpack;
import apack.A;

public class C {
    public void display() {
        System.out.println("Class C - Accessing variables of class A:");
        A objA = new A();
        System.out.println("Protected Variable: " + objA.protectedVar);
        System.out.println("Public Variable: " + objA.publicVar);
    }
}

//dpack/ProtectedDemo.java
package dpack;
import bpack.B;
import cpack.C;

public class ProtectedDemo {
    public static void main(String[] args) 
		{
        B objB = new B();
        objB.display();

        C objC = new C();
        objC.display();
    }
}
