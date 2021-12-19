```java

machineGraph = MachineGraph();
leafs = machineGraph.getLeafs();

// For each leaf assume the subproduct is ready and send out messages with fixed delay
for(Machine leaf: leafs){
    Thread outThread = new Thread(() -> this.productOut(leaf);
    int time = this.rnd.nextInt(1000 - 3000) + 1000;
    executor.scheduleWithFixedDelay(outThread,time, time,TimeUnit.MILLISECONDS);
}

private void productOut(Machine leaf){
    // Send out message
    String message = this.getOutMessage(leaf)
    this.publish(message);

    parents = leaf.getParents();

    // Schedule out message for parent machines if they are ready
    for(Machine parent: parents){

        parent.addProduct(machine.getId()); // Add one product that was received from the child machine 

        if(parent.isReady()){ // Received enough subproducts from all child machines to produce its product
            Thread outThread = new Thread(() -> this.productOut(parent);
            int time = this.rnd.nextInt(1000 - 3000) + 1000;
            executor.schedule(outThread,time,TimeUnit.MILLISECONDS);
        }
    }
}


```